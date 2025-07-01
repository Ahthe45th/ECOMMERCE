import { useEffect, useState } from 'react';
import { Confirmation } from '../../types';

export default function ConfirmationsPage() {
  const [confirmations, setConfirmations] = useState<Confirmation[]>([]);

  useEffect(() => {
    fetch('/api/admin/me').then(res => {
      if (res.status === 401) {
        window.location.href = '/admin/login';
      } else {
        fetch('/api/confirmations')
          .then(r => r.json())
          .then(setConfirmations);
      }
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Confirmations</h1>
      <table className="min-w-full text-sm border divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1 text-left">Order ID</th>
            <th className="px-2 py-1 text-left">Phone</th>
            <th className="px-2 py-1 text-left">Message</th>
            <th className="px-2 py-1 text-left">Source</th>
            <th className="px-2 py-1 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {confirmations.map(c => (
            <tr key={c._id} className="border-t">
              <td className="px-2 py-1">{c.orderId}</td>
              <td className="px-2 py-1">{c.phone}</td>
              <td className="px-2 py-1">{c.message}</td>
              <td className="px-2 py-1">{c.source}</td>
              <td className="px-2 py-1">{c.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
