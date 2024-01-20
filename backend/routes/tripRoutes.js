const express = require("express");
const Trip = require("../models/Trip");
const router = express.Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/createTrip",
  [
    body("name", "Enter your name").notEmpty(),
    body("destination", "Enter your destination").notEmpty(),
    body("from", "Enter you travelling from location").notEmpty(),
    body("age", "Your age should not be empty").isLength({ min: 1 }),
    // body("date", "Enter date of trip").notEmpty(),
    // body("time", "Enter departure time to trip").notEmpty(),
    body("date", "Enter a valid date").isISO8601(),
    body("time", "Enter a valid time").isISO8601(),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Retrieve data from the request body
    const { name, destination, from, age, date, time } = req.body;

    try {
      // Save the trip details to the database
      const trip = new Trip({ name, destination, from, age, date, time });
      await trip.save();

      // Respond with a success message or the created trip object
      res.status(200).json({ message: "Trip created successfully", trip });
    } catch (error) {
      console.error("Error saving trip to the database:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Route 2: Get all trips using: GET "/api/getAllTrips"
router.get("/getAllTrips", async (req, res) => {
  try {
    // Fetch all trips from the database
    const trips = await Trip.find();

    // Respond with the list of trips
    res.status(200).json({ trips });
  } catch (error) {
    console.error("Error fetching trips from the database:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Route 3: Get specific trip using: GET "/api/trip-details/:id"
router.get('/trip-details/:id', async (req, res) => {
  const tripId = req.params.id;

  try {
    // Retrieve trip details from the database based on the tripId
    const tripDetails = await Trip.findById(tripId);

    if (!tripDetails) {
      // If trip not found, respond with a 404 status
      return res.status(404).json({ error: 'Trip not found' });
    }

    // Send trip details as a JSON response
    res.json({ tripDetails });
  } catch (error) {
    console.error('Error fetching trip details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
