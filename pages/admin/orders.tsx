import { useState, useEffect } from 'react';
import { Order } from '../../types';
import { getOrders, updateOrder } from '../../lib/api';

export default function OrdersAdmin() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  const handleStatus = async (id: string | undefined, status: Order['status']) => {
    if (!id) return;
    const updated = await updateOrder(id, { status });
    setOrders(orders.map(o => (o._id === id ? updated : o)));
  };

  return (
    <div className="p-4 space-y-4">
      {orders.map((o) => (
        <div key={o._id} className="border p-2">
          <p className="font-semibold">
            {o.customerName} - {o.phone}
          </p>
          <p>{o.address}</p>
          <p className="text-sm">Status: {o.status}</p>
          <select
            className="border p-1 mt-1"
            value={o.status}
            onChange={(e) => handleStatus(o._id, e.target.value as Order['status'])}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      ))}
    </div>
  );
}
