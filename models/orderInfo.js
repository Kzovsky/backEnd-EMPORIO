const mongoose = require('mongoose');

const orderInfoSchema = new mongoose.Schema({
  userName: String,
  phone: String,
  price: Number,
  address: String,
  state: String,
  cep: String,
});

const OrderInfo = mongoose.model('OrderInfo', orderInfoSchema);
module.exports = OrderInfo;
