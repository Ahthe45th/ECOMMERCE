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
  address: string;
  items: Product[];
  paymentOption?: 'ondelivery' | 'paynow';
  createdAt?: string;
}

export interface Confirmation {
  _id?: string;
  orderId: string;
  phone: string;
  message: string;
  status?: 'approved' | 'pending';
  createdAt?: string;
}
