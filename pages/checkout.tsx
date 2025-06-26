import { useState } from 'react';
import { createOrder } from '../lib/api';

export default function Checkout() {
  const [form, setForm] = useState({ name: '', phone: '', address: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    await createOrder({ ...form, items: [] });
    alert('Order received! We will contact you shortly.');
  };

  return (
    <div className="p-4 space-y-2">
      <input className="border p-1 w-full" name="name" placeholder="Name" onChange={handleChange} />
      <input className="border p-1 w-full" name="phone" placeholder="Phone" onChange={handleChange} />
      <input className="border p-1 w-full" name="address" placeholder="Address" onChange={handleChange} />
      <p>M-Pesa instructions will be sent to your phone.</p>
      <button className="bg-green-500 text-white px-3 py-1" onClick={submit}>Submit</button>
    </div>
  );
}
