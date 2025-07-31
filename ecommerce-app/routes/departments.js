const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// GET all departments
router.get('/', async (req, res) => {
  const departments = await Department.find();
  res.json(departments);
});

module.exports = router;
