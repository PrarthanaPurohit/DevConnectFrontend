import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  //accept or reject request
  const reviewRequest = async (status, id) => {
    try{
        const res = axios.post(BASE_URL + "/request/review/" + status + "/" + id, {}, {withCredentials: true});
        dispatch(removeRequest(id));  //clear reviewed req from page
    }catch(err){
        console.log(err);
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests.length === 0) {
    return <h1 className="max-md:p-4">No request found</h1>;
  }
  if (!requests) return <h1 className="max-md:p-4">Loading...</h1>;

  return (
    <div className="text-center my-10 max-md:my-6 max-md:px-4">
      <h1 className="text-2xl text-bold">Pending requests</h1>

      {requests.map((req) => {
        const { firstName, lastName, age, gender, about, photoUrl,  } =
          req.fromUserId;
        return (
          <div key={req._id} className="w-full max-w-xl mx-auto my-4">
            <div className="card bg-base-300 shadow-md">
              <div className="card-body p-4">
                <div className="flex justify-between items-center gap-2 max-md:flex-wrap max-md:justify-start max-md:gap-x-4 max-md:gap-y-3">
                  {/* Profile photo */}
                  <img
                    src={photoUrl}
                    alt="profile"
                    className="w-16 h-16 mx-2 rounded-full object-cover max-md:mx-0 max-md:shrink-0"
                  />
        
                  {/* User info */}
                  <div className="flex flex-col max-md:flex-1 max-md:min-w-0 max-md:text-left">
                    <h2 className="text-lg font-semibold">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-sm opacity-70">
                      {gender}, {age}
                    </p>
                    <p className="text-sm opacity-70 max-md:line-clamp-3">{about}</p>
                  </div>

                  <div className="max-md:flex max-md:w-full max-md:gap-3">
                    <button 
                    onClick={() => reviewRequest("accepted", req._id)}  //this id is not user id, this is connection request id
                    className="btn btn-soft btn-success mx-2 max-md:mx-0 max-md:flex-1 max-md:h-11">
                      Accept
                    </button>
                    
                    <button 
                    onClick={() => reviewRequest("rejected", req._id)}
                    className="btn btn-soft btn-error mx-2 max-md:mx-0 max-md:flex-1 max-md:h-11">Reject</button>
                  </div>
                  </div>
                </div>
              </div>
          
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
