require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dataRoutes = require('./routes/data');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', dataRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Blackcoffer Dashboard API is running' });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });
