const mongoose = require('../config/database.config');

const productSchema = new mongoose.Schema({
    user:  { type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category'},
    image: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    crated: { type: Date, default: Date.now }
});

const productModel = mongoose.model('product',productSchema);

module.exports = productModel;