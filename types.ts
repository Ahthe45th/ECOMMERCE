export interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  size: string;
  gender: string;
  category: string;
  color: string;
  createdAt?: string;
}

export interface Order {
  _id?: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  items: Product[];
  paymentOption?: "ondelivery" | "paynow";
  status?: "pending" | "processed" | "shipped" | "delivered" | "cancelled";
  userId?: string;
  createdAt?: string;
}

export interface Confirmation {
  _id?: string;
  orderId: string;
  phone: string;
  message: string;
  source?: "user" | "mpesa";
  status?: "approved" | "pending";
  createdAt?: string;
}

export interface AdminUser {
  _id?: string;
  username: string;
  passwordHash?: string;
}

export interface Customer {
  _id?: string;
  email: string;
  name: string;
  passwordHash?: string;
}
