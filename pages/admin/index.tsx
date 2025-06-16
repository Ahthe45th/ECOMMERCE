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
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <input className="border p-1" name="name" placeholder="Name" onChange={handleChange} />
        <input className="border p-1" name="description" placeholder="Description" onChange={handleChange} />
        <input className="border p-1" name="price" placeholder="Price" type="number" onChange={handleChange} />
        <input className="border p-1" name="imageUrl" placeholder="Image URL" onChange={handleChange} />
        <input className="border p-1" name="size" placeholder="Size" onChange={handleChange} />
        <input className="border p-1" name="gender" placeholder="Gender" onChange={handleChange} />
        <input className="border p-1" name="category" placeholder="Category" onChange={handleChange} />
        <input className="border p-1" name="color" placeholder="Color" onChange={handleChange} />
      </div>
      <button className="bg-blue-500 text-white px-3 py-1" onClick={submit}>Add</button>

      <ul>
        {products.map(p => (
          <li key={p._id} className="flex justify-between border p-2 my-1">
            <span>{p.name}</span>
            <button className="text-red-500" onClick={() => del(p._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
