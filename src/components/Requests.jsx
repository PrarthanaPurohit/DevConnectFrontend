import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  

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
    return <h1>No request found</h1>;
  }
  if (!requests) return <h1>Loading...</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-2xl text-bold">Pending requests</h1>

      {requests.map((req) => {
        const { firstName, lastName, age, gender, about, photoUrl } =
          req.fromUserId;
        return (
          <div key={req._id} className="w-full max-w-xl mx-auto my-4">
            <div className="card bg-base-300 shadow-md">
              <div className="card-body p-4">
                <div className="flex items-center gap-4">
                  {/* Profile photo */}
                  <img
                    src={photoUrl}
                    alt="profile"
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  {/* User info */}
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold">
                      {firstName} {lastName}
                    </h2>
                    <p className="text-sm opacity-70">
                      {gender}, {age}
                    </p>
                    <p className="text-sm opacity-70">{about}</p>
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
