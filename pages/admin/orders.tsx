import { useEffect, useState } from 'react';
import { Order } from '../../types';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/admin/me').then(res => {
      if (res.status === 401) {
        window.location.href = '/admin/login';
      } else {
        fetch('/api/orders').then(r => r.json()).then(setOrders);
      }
    });
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <table className="min-w-full text-sm border divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1 text-left">Customer</th>
            <th className="px-2 py-1 text-left">Phone</th>
            <th className="px-2 py-1 text-left">Email</th>
            <th className="px-2 py-1 text-left">Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o._id} className="border-t">
              <td className="px-2 py-1">
                <a href={`/admin/orders/${o._id}`} className="text-blue-600 underline">
                  {o.customerName}
                </a>
              </td>
              <td className="px-2 py-1">{o.phone}</td>
              <td className="px-2 py-1">{o.email}</td>
              <td className="px-2 py-1">{o.items.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
