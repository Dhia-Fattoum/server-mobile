const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/bikeapp';

const db = mongoose.connect(mongoUri);

module.exports = db;