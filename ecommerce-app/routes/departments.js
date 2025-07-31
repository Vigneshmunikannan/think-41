const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// GET /api/departments - List all departments with product count
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();

    // For each department, count related products
    const results = await Promise.all(
      departments.map(async (dep) => {
        const count = await Product.countDocuments({ department: dep._id });
        return {
          id: dep._id,
          name: dep.name,
          product_count: count
        };
      })
    );

    res.json({ departments: results });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/departments/:id - Get specific department details
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    const count = await Product.countDocuments({ department: department._id });
    res.json({
      id: department._id,
      name: department.name,
      product_count: count
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/departments/:id/products - Get all products in a department
router.get('/:id/products', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid department ID' });
    }
    const department = await Department.findById(req.params.id);
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    const products = await Product.find({ department: department._id });

    res.json({
      department: department.name,
      products: products
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
