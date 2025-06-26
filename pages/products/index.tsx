import useSWR from 'swr';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';
import { fetchJson } from '../../lib/api';

export default function ProductsPage() {
  const { data, error } = useSWR<Product[]>('/api/products', fetchJson);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {data.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  );
}
