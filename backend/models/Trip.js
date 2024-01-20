const mongoose = require("mongoose");

const { Schema } = mongoose;

const TripSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  // date: {
  //   type: Date,
  //   default: Date.now,
  // },
  // time: {
  //   type: Date,
  //   default: Date.now,
  // },
  date: {
    type: Date,
    default: () => new Date(),
  },
  time: {
    type: Date,
    default: () => new Date(),
  },
});

const Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
