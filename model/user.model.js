const mongoose = require('../config/database.config');

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String,  require: true, unique: true },
  password: { type: String, require: true },
  isSeller: { type: Boolean, default: false },
  created: { type: Date, default: Date.now }
});

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;