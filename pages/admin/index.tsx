import { useState, useEffect } from "react";
import Link from "next/link";
import { TrashIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Product } from "../../types";

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, "_id" | "createdAt">>({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    size: "",
    gender: "",
    category: "",
    color: "",
  });

  useEffect(() => {
    fetch("/api/admin/me").then((res) => {
      if (res.status === 401) {
        window.location.href = "/admin/login";
      } else {
        fetch("/api/products")
          .then((r) => r.json())
          .then(setProducts);
      }
    });
  }, []);

  const submit = async () => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const updated = await fetch("/api/products").then((r) => r.json());
    setProducts(updated);
  };

  const del = async (id: string | undefined) => {
    if (!id) return;
    await fetch("/api/products/" + id, { method: "DELETE" });
    setProducts(products.filter((p) => p._id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>
      <div className="space-x-4">
        <Link href="/admin/orders" className="underline text-blue-600">
          View Orders
        </Link>
        <Link href="/admin/confirmations" className="underline text-blue-600">
          View Confirmations
        </Link>
        <Link
          href="/admin/utils/submit-mpesa"
          className="underline text-blue-600"
        >
          Add M-Pesa Message
        </Link>
        <Link href="/admin/users" className="underline text-blue-600">
          Manage Users
        </Link>
      </div>

      <div className="bg-white rounded shadow p-4 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            className="input"
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          <input
            className="input"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <input
            className="input"
            name="price"
            placeholder="Price"
            type="number"
            onChange={handleChange}
          />
          <input
            className="input"
            name="imageUrl"
            placeholder="Image URL"
            onChange={handleChange}
          />
          <input
            className="input"
            name="size"
            placeholder="Size"
            onChange={handleChange}
          />
          <input
            className="input"
            name="gender"
            placeholder="Gender"
            onChange={handleChange}
          />
          <input
            className="input"
            name="category"
            placeholder="Category"
            onChange={handleChange}
          />
          <input
            className="input"
            name="color"
            placeholder="Color"
            onChange={handleChange}
          />
        </div>
        <button className="btn-primary" onClick={submit}>
          <PlusCircleIcon className="w-5 h-5" /> Add Product
        </button>
      </div>

      <table className="min-w-full text-sm border divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id} className="border-t">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2 text-right">
                <button
                  className="text-red-600 hover:underline inline-flex items-center gap-1"
                  onClick={() => del(p._id)}
                >
                  <TrashIcon className="w-5 h-5" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
