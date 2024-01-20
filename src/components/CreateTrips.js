import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";

const CreateTripForm = () => {
  const [tripData, setTripData] = useState({
    name: "",
    destination: "",
    from: "",
    age: "",
    date: new Date(),
    time: "12:00", // Set a default time if needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripData({ ...tripData, [name]: value });
  };

  const handleDateChange = (date) => {
    setTripData({ ...tripData, date });
  };

  const handleTimeChange = (time) => {
    setTripData({ ...tripData, time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = tripData.date.toISOString();
    const dataToSend = { ...tripData, date: formattedDate };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/trip/createTrip",
        tripData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating trip:", error);
    }
  };

  return (
    <div>
      <h2>Create Trip</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Your Name:
          <input
            type="text"
            name="name"
            value={tripData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            name="destination"
            value={tripData.destination}
            onChange={handleChange}
          />
        </label>
        <label>
          From:
          <input
            type="text"
            name="from"
            value={tripData.from}
            onChange={handleChange}
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={tripData.age}
            onChange={handleChange}
          />
        </label>
        <label>
          Date:
          <DatePicker selected={tripData.date} onChange={handleDateChange} />
        </label>
        <label>
          Time:
          <TimePicker value={tripData.time} onChange={handleTimeChange} />
        </label>
        <button type="submit">Create Trip</button>
      </form>
    </div>
  );
};

export default CreateTripForm;
