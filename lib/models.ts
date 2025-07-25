import mongoose from "./db";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  imageUrl: String,
  size: String,
  gender: String,
  category: String,
  color: String,
  createdAt: { type: Date, default: Date.now },
});

const OrderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  email: String,
  address: String,
  items: Array,
  paymentOption: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  status: {
    type: String,
    enum: ["pending", "processed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const ConfirmationSchema = new mongoose.Schema({
  orderId: mongoose.Schema.Types.ObjectId,
  phone: String,
  message: String,
  source: { type: String, enum: ["user", "mpesa"], default: "user" },
  status: { type: String, enum: ["approved", "pending"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
export const Confirmation =
  mongoose.models.Confirmation ||
  mongoose.model("Confirmation", ConfirmationSchema);

const AdminUserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
});

export const AdminUser =
  mongoose.models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);

const CustomerSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
  name: String,
});

export const Customer =
  mongoose.models.Customer || mongoose.model("Customer", CustomerSchema);
