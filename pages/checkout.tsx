import { useState } from 'react';
<<<<<<< codex/extend-ecommerce-platform-functionality
import { createOrder } from '../lib/api';
=======
import { Product, Order } from '../types';
>>>>>>> main

export default function Checkout() {
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
<<<<<<< codex/extend-ecommerce-platform-functionality
    await createOrder({ ...form, items: [] });
=======
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
>>>>>>> main
    alert('Order received! We will contact you shortly.');
  };

  return (
    <div className="p-4 space-y-2">
      <input className="border p-1 w-full" name="customerName" placeholder="Name" onChange={handleChange} />
      <input className="border p-1 w-full" name="phone" placeholder="Phone" onChange={handleChange} />
      <input className="border p-1 w-full" name="address" placeholder="Address" onChange={handleChange} />
      <p>M-Pesa instructions will be sent to your phone.</p>
      <button className="bg-green-500 text-white px-3 py-1" onClick={submit}>Submit</button>
    </div>
  );
}
