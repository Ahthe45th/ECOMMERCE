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
  type: { type: String, enum: ['digital', 'physical', 'service'], default: 'physical' },
  inventory: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const OrderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,
  items: Array,
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
export const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
