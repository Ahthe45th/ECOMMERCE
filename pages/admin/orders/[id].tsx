import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect } from "react";
import { Order, Confirmation } from "../../../types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OrderDetailsPage() {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    fetch("/api/admin/me").then((res) => {
      if (res.status === 401) {
        window.location.href = "/admin/login";
      }
    });
  }, []);
  const { data, mutate } = useSWR<{
    order: Order;
    confirmation?: Confirmation;
  }>(id ? `/api/orders/${id}` : null, fetcher);

  if (!data) return <div className="p-4">Loading...</div>;

  const { order, confirmation } = data;

  const toggleStatus = async () => {
    if (!confirmation) return;
    const newStatus =
      confirmation.status === "pending" ? "approved" : "pending";
    await fetch(`/api/confirmations/${confirmation._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    mutate();
  };

  const updateOrderStatus = async (status: string) => {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    mutate();
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4 bg-white shadow rounded">
      <h1 className="text-2xl font-bold">Order Details</h1>
      <p>
        <strong>Customer:</strong> {order.customerName}
      </p>
      <p>
        <strong>Phone:</strong> {order.phone}
      </p>
      <p>
        <strong>Email:</strong> {order.email}
      </p>
      <p>
        <strong>Address:</strong> {order.address}
      </p>
      <p>
        <strong>Payment Option:</strong> {order.paymentOption}
      </p>
      <p>
        <strong>Order Status:</strong>{" "}
        <select
          value={order.status}
          onChange={(e) => updateOrderStatus(e.target.value)}
          className="border p-1 rounded"
        >
          {["pending", "processed", "shipped", "delivered", "cancelled"].map(
            (s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ),
          )}
        </select>
      </p>
      <h2 className="text-xl font-semibold mt-4">Items</h2>
      <div className="border divide-y">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 p-2">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <span className="flex-1">{item.name}</span>
            <span>KES {item.price}</span>
          </div>
        ))}
      </div>
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
