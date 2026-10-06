import React from 'react'
import axios from 'axios';
import {BASE_URL} from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  if (!user) return null;
  const { firstName, lastName, age, gender, about, photoUrl, skills = [], _id  } = user;

  // Handle accept or reject req
  const handleSendRequest = async (status, userId) => {
    try{
      const res = await  axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {},{withCredentials: true})
      dispatch(removeFeed(userId)) //remove current card
    }catch(err){
      console.log(err)
    }
  }
return (
  <div className="hover-3d flex justify-center m-10">
    <div
      className="
        hover-3d w-96 h-130
        bg-white/95
        backdrop-blur-xl
        p-4
        rounded-3xl
        shadow-[0_25px_60px_rgba(0,0,0,0.25)]
        flex flex-col
        border border-black/10
        text-[#0f2a23]
      "
    >
      {/* Profile Image */}
      <figure className="w-full rounded-2xl overflow-hidden mb-4">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-60 object-cover"
        />
      </figure>

      {/* 8 divs for 3D effect */}
      <div></div><div></div><div></div><div></div>
      <div></div><div></div><div></div><div></div>

      {/* Content */}
      <div className="space-y-2 px-8 py-2 mt-2 flex flex-col flex-1">
        {/* 👆 padding restored */}

        <h2 className="text-xl font-semibold">
          {firstName} {lastName}
        </h2>

        <p className="text-sm text-slate-600">
          {gender} • {age} years
        </p>

        <p className="text-sm text-slate-700 line-clamp-3">
          {about}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="
                px-3 py-1 text-xs font-medium
                rounded-full
                bg-slate-100
                text-slate-700
                border border-slate-200
              "
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex justify-between gap-4 pt-4">
          <button
            onClick={() => handleSendRequest('interested', _id)}
            className="
              w-1/2 py-2  text-sm font-medium
              rounded-xl
              bg-[#020617]
              text-white
              hover:bg-[#0f172a]
              transition
            "
          >
            Connect
          </button>

          <button
            onClick={() => handleSendRequest('ignored', _id)}
            className="
              w-1/2 py-2 text-sm font-medium
              rounded-xl
              border border-slate-300
              text-slate-700
              hover:bg-slate-100
              transition
            "
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  </div>
);


}

export default UserCard;
