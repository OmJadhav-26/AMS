const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const residentRoutes = require('./routes/residentRoutes');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/residents', residentRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/apartmentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
