const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/products', require('./routes/products'));
app.use('/api/departments', require('./routes/departments'));


app.listen(5000, () => console.log('Server started on port 5000'));
