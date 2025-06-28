import mongoose from './db';

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  size: String,
  gender: String,
  category: String,
  color: String,
  createdAt: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,
  items: Array,
  paymentOption: String,
  createdAt: { type: Date, default: Date.now }
});

const ConfirmationSchema = new mongoose.Schema({
  orderId: mongoose.Schema.Types.ObjectId,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export const Confirmation =
  mongoose.models.Confirmation || mongoose.model('Confirmation', ConfirmationSchema);
