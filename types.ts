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
  /**
   * Type of item being sold. Allows the shop to list
   * digital downloads, physical goods or services.
   */
  type: 'digital' | 'physical' | 'service';
  /** Remaining inventory for physical goods */
  inventory: number;
  createdAt?: string;
}

export interface Order {
  _id?: string;
  customerName: string;
  phone: string;
  address: string;
  /** Minimal representation of items purchased */
  items: Product[];
  /** Simple order status tracking */
  status: 'pending' | 'paid' | 'shipped' | 'completed';
  createdAt?: string;
}
