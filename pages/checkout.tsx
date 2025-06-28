import { useState } from 'react';
import { TrashIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';
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
  const [paymentOption, setPaymentOption] = useState<'ondelivery' | 'paynow'>('ondelivery');
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const order: Omit<Order, '_id' | 'createdAt'> = {
      ...form,
      items,
      paymentOption
    };
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    });
    const saved = await res.json();
    clear();
    setPaymentLink(`https://pay.example.com/${saved._id}`);
    alert('Order received! Use the link below to pay when ready.');
  };

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-lg font-semibold">Cart Items</h2>
      {items.length === 0 && <p>Your cart is empty.</p>}
      {items.map((item) => (
        <div key={item._id} className="flex justify-between items-center border-b py-1">
          <span>{item.name}</span>
          <button className="text-red-600 inline-flex items-center" onClick={() => removeItem(item._id)}>
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ))}

      <input className="border p-1 w-full" name="customerName" placeholder="Name" onChange={handleChange} />
      <input className="border p-1 w-full" name="phone" placeholder="Phone" onChange={handleChange} />
      <input className="border p-1 w-full" name="address" placeholder="Address" onChange={handleChange} />
      <div className="space-x-4">
        <label>
          <input
            type="radio"
            value="ondelivery"
            name="payment"
            checked={paymentOption === 'ondelivery'}
            onChange={() => setPaymentOption('ondelivery')}
          />{' '}
          Pay on Delivery
        </label>
        <label>
          <input
            type="radio"
            value="paynow"
            name="payment"
            checked={paymentOption === 'paynow'}
            onChange={() => setPaymentOption('paynow')}
          />{' '}
          Pay Now
        </label>
      </div>
      <p>M-Pesa instructions will be sent to your phone.</p>
      <button className="bg-green-500 text-white px-3 py-1 inline-flex items-center gap-1" onClick={submit}>
        Submit <ArrowRightCircleIcon className="w-5 h-5" />
      </button>
      {paymentLink && (
        <p className="mt-2">
          Payment link: {' '}
          <a href={paymentLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
            {paymentLink}
          </a>
        </p>
      )}
    </div>
  );
}
