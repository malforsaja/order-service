import mongoose from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

const orderSchema = new mongoose.Schema({
  orderId: Number,
  products: [String],
  userId: {
    type: Number
  },
  address: {
    type: String
  },
  userEmail: String
});
orderSchema.plugin(AutoIncrement, {inc_field: 'orderId'});

module.exports = mongoose.model('Order', orderSchema);

