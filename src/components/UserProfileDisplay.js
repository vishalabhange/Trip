// UserProfileDisplay.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Sidebar from "./SideBar";
import "../Css/Profile.css";
import { getToken } from "../authUtils";

// getToken = () => {
//   const token = localStorage.getItem("token");

//   return token;
// };

const UserProfileDisplay = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();

      try {
        const response = await axios.get(
          "http://localhost:8080/api/auth/getuser",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const userData = response.data;
        const { _id, name, email, date } = userData;

        setProfile({ _id, name, email, date });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <Header setAuthToken={setAuthToken} />
      <Sidebar />
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="content-profile-page">
          <div className="profile-user-page card">
            <div className="img-user-profile">
              {/* Add your image URLs */}
              <img
                className="profile-bgHome"
                src="YOUR_BACKGROUND_IMAGE_URL"
                alt=""
              />
              <img
                className="avatar"
                src="YOUR_AVATAR_IMAGE_URL"
                alt="jofpin"
              />
            </div>
            <button>Follow</button>
            <div className="user-profile-data">
              <h1>{profile.name}</h1>
              <p>{profile.email}</p>
            </div>
            <div className="description-profile">
              Registered on {new Date(profile.date).toLocaleDateString()}
            </div>
            <ul className="data-user">
              <li>
                <strong>{profile._id}</strong>
                <span>User ID</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDisplay;
