import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, photoUrl, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.error(err);

      const message =
        err?.response?.data?.message ||
        err?.response?.data ||
        err.message ||
        "Something went wrong";

      setError(message);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="flex justify-center m-4 p-6">
          <fieldset
            className="
            w-xs p-6
            rounded-3xl
            bg-white/90
            backdrop-blur-xl
            border border-black/10
            shadow-[0_25px_60px_rgba(0,0,0,0.25)]
            text-[#1f2937]
          "
          >
            <label className="label text-sm font-medium text-slate-700">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              className="
              input w-full
              bg-[#f8fafc]
              border border-slate-300
              text-slate-800
              focus:outline-none focus:border-slate-500
            "
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label text-sm font-medium text-slate-700">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              className="
              input w-full
              bg-[#f8fafc]
              border border-slate-300
              text-slate-800
              focus:outline-none focus:border-slate-500
            "
              placeholder="Last name"
              onChange={(e) => setLastName(e.target.value)}
            />

            <label className="label text-sm font-medium text-slate-700">
              About
            </label>
            <textarea
              value={about}
              placeholder="About"
              className="
              textarea w-full resize-none
              bg-[#f8fafc]
              border border-slate-300
              text-slate-800
              focus:outline-none focus:border-slate-500
            "
              rows={3}
              style={{ maxHeight: "120px" }}
              onChange={(e) => setAbout(e.target.value)}
              onInput={(e) => {
                e.target.style.height = "auto";
                const maxHeight = 120;
                e.target.style.height =
                  e.target.scrollHeight > maxHeight
                    ? `${maxHeight}px`
                    : `${e.target.scrollHeight}px`;
              }}
            />

            <label className="label text-sm font-medium text-slate-700 ">
              Gender
            </label>
            <div className="join py-1.5 ">
              {["Male", "Female", "Other"].map((g) => (
                <input
                  key={g}
                  className="
                  join-item btn
                  bg-[#f8fafc] rounded-xl 
                  border border-slate-300
                  text-slate-700
                  checked:bg-[#494b51]
                  checked:text-white
                "
                  type="radio"
                  name="gender"
                  aria-label={g}
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)}
                />
              ))}
            </div>

            <label className="label text-sm font-medium text-slate-700">
              Age
            </label>
            <input
              type="text"
              value={age}
              className="
              input w-full
              bg-[#f8fafc]
              border border-slate-300
              text-slate-800
              focus:outline-none focus:border-slate-500
            "
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="label text-sm font-medium text-slate-700">
              Photo URL
            </label>
            <input
              type="text"
              value={photoUrl}
              className="
              input w-full
              bg-[#f8fafc]
              border border-slate-300
              text-slate-800
              focus:outline-none focus:border-slate-500
            "
              placeholder="Photo URL"
              onChange={(e) => setPhotoUrl(e.target.value)}
            />

            <p className="text-red-600 text-sm mt-1">{error}</p>

            <button
              onClick={saveProfile}
              className="
              mt-4 w-full py-2
              rounded-xl
              bg-[#2c2d30]
              text-white
              hover:bg-[#1a1c1f]
              transition
            "
            >
              Save
            </button>
          </fieldset>
        </div>

        <UserCard
          user={{ firstName, lastName, about, age, gender, photoUrl }}
        />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert bg-[#020617] text-white shadow-xl">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
