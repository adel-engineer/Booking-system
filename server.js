const express = require('express');
const mongoose = require('mongoose');
const bookingRoutes = require('./routes/bookingRoutes'); // import routes
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', bookingRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('Sehrver is running');
});

app.listen(process.env.PORT, () => {
  console.log('Server running...');
});