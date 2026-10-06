import React from "react";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import {BASE_URL} from "../utils/constants.js";
import { useDispatch} from "react-redux";
import { addUser } from "../utils/userSlice.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  

  //if user data is not present then only make api calls
  const userData = useSelector((store) => store.user)

  const fetchUser = async () => {
    try {
      if(userData) return;
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if(err.status === 401){  //unauthorized
        navigate("/login")

      }
      
      console.log(err);
    }
  };

  //once the body component is loaded
  useEffect(() => {
   
    fetchUser();
  }, []);

  return (
    <div className="
  min-h-screen flex flex-col
  bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.18),transparent_45%),linear-gradient(135deg,#071814,#0f2a23,#071814)]
  text-[#f4f7f6]
">


      <NavBar />
  
      <main className="flex-1">
    <Outlet /> {/* Render child routes here */}
  </main>
      <Footer />
    </div>
  );
};

export default Body;


