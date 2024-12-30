import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../BookCard/Loader";

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfileData(response.data);
        setValue({ address: response.data.address || "" });
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const submitAddress = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/update-address",
      Value,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {!ProfileData && <Loader />}
      {ProfileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div>
              <label htmlFor="username">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.username}
              </p>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="address">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={Value.address}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end">
            <button
              className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400"
              onClick={submitAddress}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
