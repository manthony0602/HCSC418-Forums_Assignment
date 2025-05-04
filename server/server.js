const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/registration', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});

const FormData = mongoose.model('FormData', formSchema);

// POST endpoint to store form data
app.post('/submit', async (req, res) => {
  const { name, email, phone } = req.body;
  const form = new FormData({ name, email, phone });
  await form.save();
  res.status(200).send('Form data saved!');
});

// Get endpoint to check stored data
app.get('/data', async (req, res) => {
  const data = await FormData.find();
  res.json(data);
});

// Start server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
