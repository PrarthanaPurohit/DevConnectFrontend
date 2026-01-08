import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <h1>Loading...</h1>;

  if (connections.length === 0) {
    return <h1>No connections found</h1>;
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-2xl text-bold">Connections</h1>

      {connections.map((connection) => {
        return (
         <div key={connection._id} className="w-full max-w-xl mx-auto my-4">
  <div className="card bg-base-300 shadow-md">
    <div className="card-body p-4">
      <div className="flex items-center gap-4">
        
        {/* Profile photo */}
        <img
          src={connection.photoUrl}
          alt="profile"
          className="w-16 h-16 rounded-full object-cover"
        />

        {/* User info */}
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">
            {connection.firstName} {connection.lastName}
          </h2>
          <p className="text-sm opacity-70">
            {connection.gender}, {connection.age}
          </p>
          <p className="text-sm opacity-70">
            {connection.about}
          </p>
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

export default Connections;
