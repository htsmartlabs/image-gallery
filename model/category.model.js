const mongoose = require('../config/database.config');

const categorySchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  created: { type: Date, default: Date.now }
});

const categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;
