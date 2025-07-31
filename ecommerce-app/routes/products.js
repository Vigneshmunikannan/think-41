// routes/products.js
const express = require('express');
const mongoose = require('mongoose');
const Product  = require('../models/Product');

const router = express.Router();

// GET /api/products
// Optional query params: ?page=1&limit=20
router.get('/', async (req, res) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page  ) || 1);
    const limit = Math.max(1, parseInt(req.query.limit ) || 20);
    const skip  = (page - 1) * limit;

    const [ total, products ] = await Promise.all([
      Product.countDocuments(),
      Product.find()
             .skip(skip)
             .limit(limit)
             .lean()
    ]);

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      items: products
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  // 1) Check for valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid product ID' });
  }

  try {
    // 2) Lookup by _id
    const product = await Product.findById(id).lean();
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    // 3) Return it
    res.json({ success: true, item: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
