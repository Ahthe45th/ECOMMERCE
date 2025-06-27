import { useState } from 'react';
import { Product, Order } from '../types';
import { useCart } from '../lib/cart';

export default function Checkout() {
  const { items, clear, removeItem } = useCart();
  const [form, setForm] = useState<Omit<Order, '_id' | 'createdAt'>>({
    customerName: '',
    phone: '',
    address: '',
    items: []
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const order: Omit<Order, '_id' | 'createdAt'> = {
      ...form,
      items
    };
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    clear();
    alert('Order received! We will contact you shortly.');
  };

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-semibold">Cart Items</h2>
      {items.length === 0 && <p>Your cart is empty.</p>}
      {items.map((item) => (
        <div key={item._id} className="flex justify-between border-b py-1">
          <span>{item.name}</span>
          <button className="text-red-600" onClick={() => removeItem(item._id)}>
            remove
          </button>
        </div>
      ))}

      <input className="border p-1 w-full" name="customerName" placeholder="Name" onChange={handleChange} />
      <input className="border p-1 w-full" name="phone" placeholder="Phone" onChange={handleChange} />
      <input className="border p-1 w-full" name="address" placeholder="Address" onChange={handleChange} />
      <p>M-Pesa instructions will be sent to your phone.</p>
      <button className="bg-green-500 text-white px-3 py-1" onClick={submit}>Submit</button>
    </div>
  );
}
