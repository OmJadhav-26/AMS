const express = require('express');
const router = express.Router();
const Resident = require('../models/Resident');

// CREATE - POST /api/residents
router.post('/', async (req, res) => {
  try {
    const resident = new Resident(req.body);
    await resident.save();
    res.status(201).json(resident);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to save resident' });
  }
});

// READ ALL - GET /api/residents
router.get('/', async (req, res) => {
  try {
    const residents = await Resident.find();
    res.json(residents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch residents' });
  }
});

// READ ONE - GET /api/residents/:id
router.get('/:id', async (req, res) => {
  try {
    const resident = await Resident.findById(req.params.id);
    if (!resident) {
      return res.status(404).json({ message: 'Resident not found' });
    }
    res.json(resident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch resident' });
  }
});


// READ ONE - GET /api/residents/:id


module.exports = router;
