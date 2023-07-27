const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phonenumber: { type: String, required: true, },
  products: [{
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
  }],
  timestamp: { type: Date, default: Date.now },
  order_for_date_format: Date,
  order_for_date_string: String,
  total_price: Number,
});

module.exports = mongoose.model('Order', orderSchema);

