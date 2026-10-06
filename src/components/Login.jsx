import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import {
  PASSWORD_RULES,
  validateLogin,
  validateSignUp,
  getAuthErrorMessage,
} from "../utils/validation";

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
    // emails are stored trimmed + lowercase on the backend
    const data = {
      emailId: emailId.trim().toLowerCase(),
      password: password,
      firstName: firstName.trim(),
      lastName: lastName.trim()
    };
    const problem = validateSignUp(data);
    if (problem) return setError(problem);
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        data,
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile"); //once data arrived; navigate
    } catch (error) {
      setError(getAuthErrorMessage(error, false));
    }
  };


  const handleLogin = async () => {
    const data = {
      emailId: emailId.trim().toLowerCase(),
      password: password,
    };
    const problem = validateLogin(data);
    if (problem) return setError(problem);
    setError("");

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        data,
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      navigate("/"); //once data arrived; navigate
    } catch (error) {
      setError(getAuthErrorMessage(error, true));
    }
  };

  return (
    <>
    <div className="flex justify-center m-16 p-6 max-md:m-0 max-md:px-4 max-md:py-8">
      <fieldset
  className="
    w-xs p-7 rounded-2xl max-md:w-full max-md:max-w-sm max-md:p-5
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
              className="input w-full rounded-xl max-md:h-11 max-md:text-base
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
              className="input w-full rounded-xl max-md:h-11 max-md:text-base
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
          className="input w-full rounded-xl max-md:h-11 max-md:text-base
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
          className="input w-full rounded-xl max-md:h-11 max-md:text-base
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

        {/* Password requirements - ticked off live while typing */}
        {!isLoginForm && (
          <ul className="mt-2 space-y-1 text-xs">
            {PASSWORD_RULES.map((rule) => {
              const met = rule.test(password);
              return (
                <li
                  key={rule.label}
                  className={`flex items-center gap-1.5 ${met ? "text-emerald-700" : "text-slate-500"}`}
                >
                  <span aria-hidden="true" className="w-3 text-center">{met ? "✓" : "•"}</span>
                  {rule.label}
                </li>
              );
            })}
          </ul>
        )}

        <p role="alert" className="text-red-500 text-sm mt-1">{error}</p>

        <button onClick={isLoginForm ? handleLogin : handleSignUp} 
        className="btn mt-5 w-full rounded-xl max-md:h-12 max-md:text-base
    bg-gradient-to-r from-emerald-900 to-emerald-950
    text-white font-semibold
    hover:from-emerald-800 hover:to-emerald-900
    transition-all duration-200">
          {isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p className="text-emerald-700 text-sm text-center mt-4 max-md:py-3
    cursor-pointer hover:text-emerald-900 hover:underline" 
        onClick={() => {
          setIsLoginForm((value) => !value);
          setError(""); // don't carry an old error over to the other form
        }}>{isLoginForm ? "New user? Sign up now." : "Go to login"}</p>

      </fieldset>
    </div></>
  );
};

export default Login;
