// scripts/importCSV.js

const mongoose = require('mongoose');
const csv       = require('csv-parser');
const fs        = require('fs');
const path      = require('path');

// adjust this path if your folder structure is different
const Product = require('../models/Product');

async function runImport() {
  try {
    // 1. Connect (awaited)
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      // fail fast if cannot reach Mongo
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ MongoDB connected');

    // 2. Read & parse CSV
    const results = [];
    const csvFile = path.join(__dirname, '../data/products.csv');
    fs.createReadStream(csvFile)
      .pipe(csv())
      .on('data', (row) => {
        // optionally massage/convert row here:
        // e.g. row.price = parseFloat(row.price);
        results.push(row);
      })
      .on('end', async () => {
        try {
          // 3. Bulk insert
          await Product.insertMany(results);
          console.log('✅ Data successfully imported');
        } catch (insertErr) {
          console.error('❌ Error inserting documents:', insertErr);
        } finally {
          // 4. Disconnect
          await mongoose.disconnect();
          console.log('🔌 MongoDB disconnected');
          process.exit(0);
        }
      })
      .on('error', (err) => {
        console.error('❌ Error reading CSV file:', err);
        process.exit(1);
      });

  } catch (connErr) {
    console.error('❌ MongoDB connection failed:', connErr);
    process.exit(1);
  }
}

runImport();
