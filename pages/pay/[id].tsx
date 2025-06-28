import { useRouter } from 'next/router';
import { useState } from 'react';

export default function PayPage() {
  const router = useRouter();
  const { id } = router.query;
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (!id) return;
    await fetch('/api/confirmations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId: id,
        phone,
        message,
        status: 'pending',
        source: 'user'
      })
    });
    setSent(true);
  };

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-xl font-bold">Payment Confirmation</h1>
      <input
        className="border p-2 w-full"
        placeholder="Phone number used"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <textarea
        className="border p-2 w-full"
        rows={4}
        placeholder="Paste M-Pesa confirmation message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
      {sent && <p className="text-green-600">Confirmation received.</p>}
    </div>
  );
}
