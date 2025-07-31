const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: Number,
  cost: Number,
  category: String,
  name: String,
  brand: String,
  retail_price: Number,
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
  sku: String,
  distribution_center_id: Number
});

module.exports = mongoose.model('Product', productSchema);
