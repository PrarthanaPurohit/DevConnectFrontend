import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

//same rules as validator.isStrongPassword() on the backend
const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p) => p.length >= 8 },
  { label: "One uppercase letter (A-Z)", test: (p) => /[A-Z]/.test(p) },
  { label: "One lowercase letter (a-z)", test: (p) => /[a-z]/.test(p) },
  { label: "One number (0-9)", test: (p) => /[0-9]/.test(p) },
  { label: "One special character (e.g. @ # $ % !)", test: (p) => /[-#!$@£%^&*()_+|~=`{}[\]:";'<>?,./\\ ]/.test(p) },
];

const getErrorMessage = (err) => {
  if (!err?.response) return "Unable to reach the server. Please check your internet connection and try again.";
  const data = err.response.data;
  return (typeof data === "string" ? data : data?.message) || "Something went wrong. Please try again.";
};

const Login = () => {
  const navigate = useNavigate();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loading, setLoading] = useState(false);

  //check inputs before hitting the api
  const validateForm = () => {
    if (!isLoginForm) {
      if (!firstName.trim()) return "Please enter your first name.";
      if (firstName.trim().length < 2) return "First name must be at least 2 characters.";
      if (!lastName.trim()) return "Please enter your last name.";
    }
    if (!emailId.trim()) return "Please enter your email.";
    if (!/^\S+@\S+\.\S+$/.test(emailId.trim())) return "Please enter a valid email address (e.g. name@example.com).";
    if (!password) return "Please enter your password.";
    if (!isLoginForm && !PASSWORD_RULES.every((rule) => rule.test(password))) {
      return "Password is not strong enough. Please meet all the requirements listed below.";
    }
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    setError(validationError);
    if (validationError) return;

    setLoading(true);
    try {
      await (isLoginForm ? handleLogin() : handleSignUp());
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    const res = await axios.post(
      BASE_URL + "/signup",
      {
        emailId: emailId.trim(),
        password: password,
        firstName: firstName.trim(),
        lastName: lastName.trim()
      },
      { withCredentials: true }
    );
    dispatch(addUser(res.data.data));
    navigate("/profile"); //once data arrived; navigate
  };


  const handleLogin = async () => {
    const res = await axios.post(
      BASE_URL + "/login",
      {
        emailId: emailId.trim(),
        password: password,
      },
      { withCredentials: true }
    );

    dispatch(addUser(res.data));
    navigate("/"); //once data arrived; navigate
  };

  return (
    <>
    <div className="flex justify-center m-4 sm:m-16 p-2 sm:p-6">
      <fieldset
  className="
    w-full max-w-xs p-7 rounded-2xl
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

        {/* Password requirements - only shown on sign up */}
        {!isLoginForm && (
          <ul className="text-xs mt-2 space-y-0.5">
            {PASSWORD_RULES.map((rule) => {
              const passed = rule.test(password);
              return (
                <li key={rule.label} className={passed ? "text-emerald-600" : "text-slate-500"}>
                  {passed ? "✓" : "•"} {rule.label}
                </li>
              );
            })}
          </ul>
        )}

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <button onClick={handleSubmit} disabled={loading}
        className="btn mt-5 w-full rounded-xl
    bg-gradient-to-r from-emerald-900 to-emerald-950
    text-white font-semibold
    hover:from-emerald-800 hover:to-emerald-900
    transition-all duration-200">
          {loading ? "Please wait..." : isLoginForm ? "Login" : "Sign Up"}
        </button>

        <p className="text-emerald-700 text-sm text-center mt-4
    cursor-pointer hover:text-emerald-900 hover:underline"
        onClick={() => { setIsLoginForm((value) => !value); setError(""); }}>{isLoginForm ? "New user? Sign up now." : "Go to login"}</p>

      </fieldset>
    </div></>
  );
};

export default Login;
