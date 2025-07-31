// scripts/migrate_departments.js

const mongoose   = require('mongoose');
const Product    = require('../models/Product');
const Department = require('../models/Department');

async function migrateDepartments() {
  // 1) connect
  await mongoose.connect('mongodb://localhost:27017/ecommerce', {
    serverSelectionTimeoutMS: 5000, // fail fast if mongod isn’t up
  });
  console.log('✅ Connected to MongoDB');

  try {
    // 2) get all distinct department *names* from your old products
    const deptNames = await Product.distinct('department');
    const depMap    = {};

    // 3) ensure each exists in departments collection
    for (const name of deptNames) {
      if (!name) continue;
      let dept = await Department.findOne({ name });
      if (!dept) {
        dept = await Department.create({ name });
        console.log(`➕ Created department: ${name}`);
      }
      depMap[name] = dept._id;
    }

    // 4) update products in raw collection (bypass Mongoose-casting)
    for (const [name, id] of Object.entries(depMap)) {
      const { modifiedCount } = await Product.collection.updateMany(
        { department: name },         // matches on raw string
        { $set: { department: id } }  // sets ObjectId ref
      );
      console.log(`✏️  ${modifiedCount} products re‐assigned to “${name}”`);
    }

    console.log('✅ Migration complete!');
  } catch (err) {
    console.error('❌ Migration error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    process.exit(0);
  }
}

migrateDepartments();
