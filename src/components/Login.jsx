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
    const dispatch = useDispatch();

    const handleLogin = async () => {
      
        try{
          const res = await axios.post(BASE_URL + "/login", {
            emailId: emailId,
            password: password
        }, { withCredentials: true});
        
        dispatch(addUser(res.data));
        navigate("/"); //once data arrived; navigate
      
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
