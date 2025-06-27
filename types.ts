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
  customerName: string;
  phone: string;
  address: string;
  items: Product[];
  paymentOption?: 'ondelivery' | 'paynow';
  createdAt?: string;
}
