import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Order, Confirmation } from '../../../types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR<{ order: Order; confirmation?: Confirmation }>(
    id ? `/api/orders/${id}` : null,
    fetcher
  );

  if (!data) return <div className="p-4">Loading...</div>;

  const { order, confirmation } = data;

  const toggleStatus = async () => {
    if (!confirmation) return;
    const newStatus = confirmation.status === 'pending' ? 'approved' : 'pending';
    await fetch(`/api/confirmations/${confirmation._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    mutate();
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-2">
      <h1 className="text-2xl font-bold mb-2">Order Details</h1>
      <p>
        <strong>Customer:</strong> {order.customerName}
      </p>
      <p>
        <strong>Phone:</strong> {order.phone}
      </p>
      <p>
        <strong>Address:</strong> {order.address}
      </p>
      <p>
        <strong>Payment Option:</strong> {order.paymentOption}
      </p>
      <h2 className="text-xl font-semibold mt-4">Items</h2>
      <ul className="list-disc ml-4">
        {order.items.map((item, idx) => (
          <li key={idx}>
            {item.name} - KES {item.price}
          </li>
        ))}
      </ul>
      {confirmation ? (
        <div className="mt-4 space-y-2">
          <p>
            <strong>Confirmation Status:</strong> {confirmation.status}
          </p>
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={toggleStatus}
          >
            Toggle Status
          </button>
        </div>
      ) : (
        <p className="mt-4">No payment confirmation.</p>
      )}
    </div>
  );
}
