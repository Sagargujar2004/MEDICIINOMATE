const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/medicinoMate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Define Pill Schema
const pillSchema = new mongoose.Schema({
  afternoonPills: Boolean,
  nightPills: Boolean,
  date: { type: Date, default: Date.now },
});

// Model
const Pill = mongoose.model('Pill', pillSchema);

// API route to handle form submission
app.post('/api/pill-tracker', async (req, res) => {
    console.log(req.body.afternoonPills);
    try {
        
      const newPillRecord = new Pill({
        afternoonPills: req.body.afternoonPills,
        nightPills: req.body.nightPills,
      });
  
      // Save the pill record using async/await
      await newPillRecord.save();
      res.status(200).send({ message: 'Data saved successfully' });
    } catch (err) {
      res.status(500).send({ message: 'Error saving data' });
    }
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
