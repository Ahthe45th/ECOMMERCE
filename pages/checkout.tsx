import { useState } from "react";
import { TrashIcon, ArrowRightCircleIcon } from "@heroicons/react/24/outline";
import { Product, Order } from "../types";
import { useCart } from "../lib/cart";

export default function Checkout() {
  const { items, clear, removeItem } = useCart();
  const [form, setForm] = useState<Omit<Order, "_id" | "createdAt">>({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    items: [],
  });
  const [paymentOption, setPaymentOption] = useState<"ondelivery" | "paynow">(
    "ondelivery",
  );
  const [paymentLink, setPaymentLink] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    const order: Omit<Order, "_id" | "createdAt"> = {
      ...form,
      items,
      paymentOption,
    };
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });
    const saved = await res.json();
    clear();
    setPaymentLink(`/pay/${saved._id}`);
    alert("Order received! Use the link below to pay when ready.");
  };

  const orderOnWhatsApp = () => {
    if (items.length === 0) return;
    const base = window.location.origin;
    const details = items
      .map(
        (i) =>
          `${i.name}\nURL: ${base}/products/${i._id}\nPrice: KES ${i.price}`,
      )
      .join("\n\n");
    const msg = `Hello, I want to purchase \n${details}`;
    const url =
      "https://api.whatsapp.com/send?phone=254700474550&text=" +
      encodeURIComponent(msg);
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-3">
      <h2 className="text-lg font-semibold">Cart Items</h2>
      {items.length === 0 && <p>Your cart is empty.</p>}
      {items.map((item) => (
        <div
          key={item._id}
          className="flex items-center justify-between border-b py-1 gap-2"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-10 h-10 object-cover"
          />
          <span className="flex-1">{item.name}</span>
          <button
            className="text-red-600 inline-flex items-center"
            onClick={() => removeItem(item._id)}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ))}

      <input
        className="input"
        name="customerName"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        className="input"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
      />
      <input
        className="input"
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        className="input"
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />
      <div className="space-x-4">
        <label>
          <input
            type="radio"
            value="ondelivery"
            name="payment"
            checked={paymentOption === "ondelivery"}
            onChange={() => setPaymentOption("ondelivery")}
          />{" "}
          Pay on Delivery
        </label>
        <label>
          <input
            type="radio"
            value="paynow"
            name="payment"
            checked={paymentOption === "paynow"}
            onChange={() => setPaymentOption("paynow")}
          />{" "}
          Pay Now
        </label>
      </div>
      <p>M-Pesa instructions will be sent to your phone.</p>
      <button className="btn-success" onClick={submit}>
        Submit <ArrowRightCircleIcon className="w-5 h-5" />
      </button>
      <button className="btn-primary" onClick={orderOnWhatsApp}>
        Order on WhatsApp
      </button>
      {paymentLink && (
        <div className="mt-2 space-x-2">
          <a
            href={paymentLink}
            className="btn-primary inline-block"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Payment
          </a>
          <button
            className="btn-secondary"
            onClick={() =>
              paymentLink && navigator.clipboard.writeText(paymentLink)
            }
          >
            Copy Link
          </button>
        </div>
      )}
    </div>
  );
}
