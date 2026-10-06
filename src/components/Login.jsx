import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          emailId: emailId,
          password: password,
          firstName: firstName,
          lastName: lastName
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile"); //once data arrived; navigate
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };


  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId: emailId,
          password: password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/"); //once data arrived; navigate
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
    }
  };

  return (
    <>
    <div className="flex justify-center m-16 p-6">
      <fieldset
  className="
    w-xs p-7 rounded-2xl
    bg-white/90
    backdrop-blur-xl
    border border-emerald-900/10
    shadow-[0_25px_60px_rgba(0,0,0,0.35)]
    text-[#0f2a23]
  "
>


        {!isLoginForm && (
          <>
            <label className="label text-sm font-medium text-emerald-900">First Name</label>
            <input
              type="text"
              value={firstName}
              className="input w-full rounded-xl
  bg-white
  border border-emerald-900/20
  text-[#0f2a23]
  placeholder:text-slate-400
  focus:outline-none
  focus:border-emerald-600
  focus:ring-2 focus:ring-emerald-500/20"
              placeholder=""
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label text-sm font-medium text-emerald-900">Last Name</label>
            <input
              type="text"
              value={lastName}
              className="input w-full rounded-xl
  bg-white
  border border-emerald-900/20
  text-[#0f2a23]
  placeholder:text-slate-400
  focus:outline-none
  focus:border-emerald-600
  focus:ring-2 focus:ring-emerald-500/20"
              placeholder=""
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="label text-sm font-medium text-emerald-900">Email</label>
        <input
          type="email"
          value={emailId}
          className="input w-full rounded-xl
  bg-white
  border border-emerald-900/20
  text-[#0f2a23]
  placeholder:text-slate-400
  focus:outline-none
  focus:border-emerald-600
  focus:ring-2 focus:ring-emerald-500/20"
          placeholder=""
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label text-sm font-medium text-emerald-900">Password</label>
        <input
          type="password"
          value={password}
          className="input w-full rounded-xl
  bg-white
  border border-emerald-900/20
  text-[#0f2a23]
  placeholder:text-slate-400
  focus:outline-none
  focus:border-emerald-600
  focus:ring-2 focus:ring-emerald-500/20"
          placeholder=""
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className="text-red-500 text-sm mt-1">{error}</p>

        <button onClick={isLoginForm ? handleLogin : handleSignUp} 
        className="btn mt-5 w-full rounded-xl
    bg-gradient-to-r from-emerald-900 to-emerald-950
    text-white font-semibold
    hover:from-emerald-800 hover:to-emerald-900
    transition-all duration-200">
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p className="text-emerald-700 text-sm text-center mt-4
    cursor-pointer hover:text-emerald-900 hover:underline" 
        onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "New user? Sign up now." : "Go to login"}</p>

      </fieldset>
    </div></>
  );
};

export default Login;
