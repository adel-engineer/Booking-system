const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
 name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    validate: {
    validator: function(v) {
      return /^[A-Za-z\s]+$/.test(v);
    },
    message: 'Name must contain only letters'
  }
  },
  date: {
    type: String,
    required: [true, 'Date is required'],
    trim: true,
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
    trim: true,
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;