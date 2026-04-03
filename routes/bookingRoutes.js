const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /book — create a new booking
router.post('/book', async (req, res) => {
  try {
    const { name, date, time } = req.body;

    const newBooking = new Booking({ name, date, time });
    await newBooking.save();

    res.status(201).json({
      message: 'Booking created successfully!',
      booking: newBooking
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /bookings — retrieve all bookings
router.get('/bookings', async (__, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
