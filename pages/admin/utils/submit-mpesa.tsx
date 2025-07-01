import { useState, useEffect } from 'react';

export default function SubmitMpesa() {
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState('');
  const [orderId, setOrderId] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch('/api/admin/me').then(res => {
      if (res.status === 401) {
        window.location.href = '/admin/login';
      }
    });
  }, []);

  const submit = async () => {
    await fetch('/api/mpesa', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, phone, message })
    });
    setSent(true);
    setMessage('');
    setPhone('');
    setOrderId('');
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-2">
      <h1 className="text-xl font-bold">Record M-Pesa Message</h1>
      <input
        className="border p-2 w-full"
        placeholder="Order ID (optional)"
        value={orderId}
        onChange={e => setOrderId(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        placeholder="Sender Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        rows={4}
        placeholder="Full M-Pesa message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={submit}
      >
        Save Message
      </button>
      {sent && <p className="text-green-600">Message saved.</p>}
    </div>
  );
}
