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
    <div>
      <NavBar />
      <Outlet /> {/* Render child routes here */}
      <Footer />
    </div>
  );
};

export default Body;
