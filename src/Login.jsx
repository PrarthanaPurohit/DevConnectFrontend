import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => {

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try{
        axios.post("http://localhost:3000/login", {
            email: emailId,
            password: password
        })
        }
        catch(error)  {
            console.log("Login Failed", error);
        };

    }

  return (
    <div className="flex justify-center m-16 p-6">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <label className="label">Email</label>
        <input type="email"
        value={emailId}
         className="input" 
         placeholder="Email" 
         onChange={(e) => setEmailId(e.target.value)} />

        <label className="label">Password</label>
        <input type="password"
        value={password}
         className="input" 
         placeholder="Password" 
         onChange={(e) => setPassword(e.target.value)}/>

        <button
        onClick={handleLogin}
        className="btn btn-neutral mt-4">Login</button>
      </fieldset>
    </div>
  );
};

export default Login;
