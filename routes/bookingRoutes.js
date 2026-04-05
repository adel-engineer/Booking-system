const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /book 
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

// GET /bookings
router.get('/bookings', async (__, res) => {
  try {
    const bookings = await Booking.find();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// DELETE /booking/ID
router.delete('/booking/:id',async (req, res) => {
  try{
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if(!booking){
      return res.status(404).json({message: 'Booking not found'})
    }
    res.status(200).json({ message: 'Booking cancelled successfully!' });
  }catch(error){
    res.status(500).json({ message: error.message });
  }
})

// UPDATE /booking/ID
router.put('/booking/:id',async (req, res) =>{
  try{
      const {name, date, time} = req.body;

      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        {name, date, time},
        { new: true, runValidators: true }
      );

    if(!booking){
      return res.status(404).json({message:'Booking not found'})
    }
    res.status(200).json({
      message: 'Booking updated successfully!',
      booking
});
  }catch(error){  res.status(500).json({ message: error.message }); }


})

module.exports = router;
