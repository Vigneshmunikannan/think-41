// routes/products.js
const express  = require('express');
const mongoose = require('mongoose');
const Product  = require('../models/Product');

const router = express.Router();
require('../models/Department');
// GET /api/products?departmentId=XXX&page=1&limit=20
router.get('/', async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 20);
    const skip  = (page - 1) * limit;

    // Build filter object
    const filter = {};
    if (req.query.departmentId) {
      filter.department = req.query.departmentId; // must be ObjectId
    }
    // You can add more filters here

    // Get filtered total and paginated products
    const [ total, products ] = await Promise.all([
      Product.countDocuments(filter),
      Product.find(filter)
        .skip(skip)
        .limit(limit)
        .populate('department', 'name')
        .lean()
    ]);

    res.json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      items: products,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // 1) Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid product ID' });
  }

  try {
    // 2) Find & populate
    const product = await Product
      .findById(id)
      .populate('department', 'name')
      .lean();

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    // 3) Send back
    res.json({ success: true, item: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
