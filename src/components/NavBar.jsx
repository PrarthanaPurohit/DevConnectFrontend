import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { addFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const NavBar = () => {

  //subscribe to the store
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //logout
  const handleLogout = async () => {
    try{
      await axios.post(BASE_URL + "/logout", {}, {withCredentials: true}) //token gone
      //clear redux store
      dispatch(removeUser());
      dispatch(addFeed(null)); //so next login doesn't see the old user's feed
      //redirect to login
      navigate("/login")

    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="navbar relative z-50 px-3 sm:px-6 bg-white/5 backdrop-blur-xl border-b border-white/10">
  {/* Logo */}
  <div className="flex-1">
    <Link
      to="/"
      className="text-lg sm:text-xl font-semibold text-[#f4f7f6] hover:text-emerald-300 transition"
    >
      DevConnect
    </Link>
  </div>

  {/* Header Links */}
  <div className="flex items-center gap-2 sm:gap-6 text-sm sm:text-base">
    {/* Profile Dropdown - only shown when logged in */}
    {user && (
      <>
        <Link
          to="/"
          className="flex items-center gap-1 text-[#cbd5d1] hover:text-emerald-300 font-medium transition"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.5 12 3l9 7.5V21h-6v-6H9v6H3z" />
          </svg>
          <span className="hidden sm:inline">Home</span>
        </Link>

        <Link
          to="/connections"
          className="text-[#cbd5d1] hover:text-emerald-300 font-medium transition"
        >
          Connections
        </Link>

        <Link
          to="/requests"
          className="text-[#cbd5d1] hover:text-emerald-300 font-medium transition"
        >
          Requests
        </Link>

        <div className="dropdown dropdown-end ml-2">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img src={user.photoUrl} alt="user" />
            </div>
          </div>

          <ul
            tabIndex={0}
            className="
              dropdown-content menu mt-3 w-48 p-2
              bg-white/90 backdrop-blur-xl
              rounded-xl shadow-xl
              border border-emerald-900/10
              text-[#0f2a23]
            "
          >
            <li>
              <Link to="/profile" className="rounded-lg hover:bg-emerald-100">
                Edit Profile
              </Link>
            </li>

            <li>
              <Link to="/premium" className="rounded-lg hover:bg-emerald-100">
                Premium
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50 rounded-lg"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </>
    )}
  </div>
</div>

  );
};

export default NavBar;
