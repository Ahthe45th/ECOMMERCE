import { useState, useEffect } from 'react';
import { Product } from '../../types';

export default function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<Omit<Product, '_id' | 'createdAt'>>({
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    size: '',
    gender: '',
    category: '',
    color: ''
  });

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  const submit = async () => {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const updated = await fetch('/api/products').then(r => r.json());
    setProducts(updated);
  };

  const del = async(id: string | undefined) => {
    if (!id) return;
    await fetch('/api/products/' + id, { method: 'DELETE' });
    setProducts(products.filter(p => p._id !== id));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Admin Panel</h1>

      <div className="bg-white rounded shadow p-4 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input className="border rounded p-2 w-full" name="name" placeholder="Name" onChange={handleChange} />
          <input className="border rounded p-2 w-full" name="description" placeholder="Description" onChange={handleChange} />
          <input className="border rounded p-2 w-full" name="price" placeholder="Price" type="number" onChange={handleChange} />
          <input className="border rounded p-2 w-full" name="imageUrl" placeholder="Image URL" onChange={handleChange} />
          <input className="border rounded p-2 w-full" name="size" placeholder="Size" onChange={handleChange} />
          <input className="border rounded p-2 w-full" name="gender" placeholder="Gender" onChange={handleChange} />
          <input className="border rounded p-2 w-full" name="category" placeholder="Category" onChange={handleChange} />
          <input className="border rounded p-2 w-full" name="color" placeholder="Color" onChange={handleChange} />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded" onClick={submit}>Add Product</button>
      </div>

      <table className="min-w-full text-sm border divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border-t">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2 text-right">
                <button className="text-red-600 hover:underline" onClick={() => del(p._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
