// TripDetails.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "material-icons/iconfont/material-icons.css";
import "../Css/TripDetails.css";

const TripDetails = () => {
  const { id } = useParams();
  const [tripDetails, setTripDetails] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch trip details based on the id
    const fetchTripDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/trip/trip-details/${id}`
        );
        setTripDetails(response.data.tripDetails);
      } catch (error) {
        console.error("Error fetching trip details:", error);
      }
    };

    fetchTripDetails();
  }, [id]);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = () => {
    if (comment.trim() !== "") {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  if (!tripDetails) {
    return <p className="trip-details-loading">Loading...</p>;
  }

  return (
    <div className="trip-details-container">
      <h2 className="trip-details-title">{tripDetails.name}</h2>
      <p className="trip-details-location">
        From: {tripDetails.from} ➡️ To: {tripDetails.destination}
      </p>
      <p className="trip-details-age">Age: {tripDetails.age}</p>
      <p className="trip-details-date-time">
        Date: {tripDetails.date} & Time: {tripDetails.time}
      </p>
      <button className="toggle-comments-button" onClick={handleToggleComments}>
        {showComments ? "Hide Comments" : "Show Comments"}
      </button>
      {showComments && (
        <div className="comments-section">
          <h3>Comments</h3>
          {comments.map((c, index) => (
            <p key={index} className="comment">
              {c}
            </p>
          ))}
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleCommentChange}
          />
          <button className="add-comment-button" onClick={handleAddComment}>
            Add Comment
          </button>
        </div>
      )}
    </div>
  );
};

export default TripDetails;
