import useSWR from "swr";
import { useEffect } from "react";
import { Order } from "../../types";
import Spinner from "../../components/Spinner";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MyOrders() {
  const { data: orders, error } = useSWR<Order[]>(
    "/api/orders?mine=1",
    fetcher,
  );

  useEffect(() => {
    fetch("/api/users/me").then((res) => {
      if (res.status === 401) {
        window.location.href = "/login";
      }
    });
  }, []);

  if (error) return <div>Failed to load</div>;
  if (!orders) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 && <p>No orders yet.</p>}
      <table className="min-w-full text-sm border divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1 text-left">Date</th>
            <th className="px-2 py-1 text-left">Status</th>
            <th className="px-2 py-1 text-left">Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="border-t">
              <td className="px-2 py-1">
                {new Date(o.createdAt || "").toLocaleDateString()}
              </td>
              <td className="px-2 py-1">{o.status}</td>
              <td className="px-2 py-1">{o.items.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
