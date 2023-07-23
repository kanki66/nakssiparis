const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phonenumber: { type: String, required: true, },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
  }],
  order_date: { type: Date, default: Date.now },
  order_date_for: { type: Date }
});

module.exports = mongoose.model('Order', orderSchema);

