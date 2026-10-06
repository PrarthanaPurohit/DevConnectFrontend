import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { createSocketConnection } from "../utils/socket";
import { BASE_URL } from "../utils/constants";

const LIMIT = 10;

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [receiver, setReceiver] = useState(null);

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  /* ---------------- FETCH CHAT (CURSOR PAGINATION) ---------------- */
  const fetchChat = async () => {
    const before =
      messages.length > 0 ? messages[0].createdAt : null;

    const res = await axios.get(
      `${BASE_URL}/chat/${targetUserId}`,
      {
        params: {
          limit: LIMIT,
          before,
        },
        withCredentials: true,
      }
    );

    const formatted = res.data.messages.map((msg) => ({
      _id: msg._id,
      text: msg.text,
      senderId: msg.senderId?._id || msg.senderId,
      senderName: msg.senderId?.firstName,
      createdAt: msg.createdAt,
    }));

    setMessages((prev) => [...formatted, ...prev]);
    setReceiver(res.data.receiver);
    setHasMore(res.data.hasMore);
  };

  /* ---------------- INITIAL LOAD ---------------- */
  useEffect(() => {
    if (!userId || !targetUserId) return;
    fetchChat();
  }, [userId, targetUserId]);

  /* ---------------- SOCKET ---------------- */
  useEffect(() => {
    if (!userId || !targetUserId) return;

    socketRef.current = createSocketConnection();

    socketRef.current.on("connect", () => {
      socketRef.current.emit("joinChat", { targetUserId });
    });

    socketRef.current.on("messageReceived", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketRef.current.on("connect_error", (err) => {
      console.log("❌ Socket error:", err.message);
    });

    return () => socketRef.current.disconnect();
  }, [userId, targetUserId]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    // On phones the chat fills the screen, so only scroll the message list
    // ("nearest") and leave the page itself where it is. Desktop keeps the default.
    const isPhone = window.matchMedia("(max-width: 767px)").matches;
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: isPhone ? "nearest" : "start",
    });
  }, [messages]);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketRef.current.emit("sendMessage", {
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  /* ---------------- LOAD OLDER ---------------- */
  const loadOlderMessages = () => {
    if (!hasMore) return;
    fetchChat();
  };

  return (
    <div className="flex justify-center my-10 max-md:my-0">
      <div className="w-full max-w-2xl card bg-base-300 shadow-xl max-md:rounded-none max-md:h-[calc(100dvh-4rem)]">

        {/* ---------- HEADER ---------- */}
        <div className="flex items-center gap-4 p-4 border-b bg-base-200">
          <img
            src={receiver?.photoUrl}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover"
          />
          <h2 className="text-lg font-semibold">
            {receiver?.firstName}
          </h2>
        </div>

        {/* ---------- MESSAGES ---------- */}
        <div className="p-4 h-96 overflow-y-auto space-y-3 max-md:h-auto max-md:flex-1 max-md:min-h-0 max-md:px-3 max-md:overscroll-contain">

          {hasMore && (
            <button
              onClick={loadOlderMessages}
              className="btn btn-xs btn-outline w-full mb-2 max-md:h-10"
            >
              Load older messages
            </button>
          )}

          {messages.map((msg) => {
            const isOwn = msg.senderId === userId;

            return (
              <div
                key={msg._id}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs max-md:max-w-[85%] max-md:[overflow-wrap:anywhere] px-4 py-2 rounded-2xl shadow ${
                    isOwn
                      ? "bg-primary text-white rounded-br-none"
                      : "bg-base-200 rounded-bl-none"
                  }`}
                >
                  {!isOwn && (
                    <p className="text-xs font-semibold text-blue-600">
                      {msg.senderName}
                    </p>
                  )}
                  <p>{msg.text}</p>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>

        {/* ---------- INPUT ---------- */}
        <div className="p-4 flex gap-2 border-t max-md:p-3">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="input input-bordered w-full max-md:h-11 max-md:text-base"
            placeholder="Type a message..."
          />
          <button onClick={sendMessage} className="btn btn-primary max-md:h-11">
            Send
          </button>
        </div>

      </div>
    </div>
  );
};

export default Chat;

