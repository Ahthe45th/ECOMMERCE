import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Product } from '../../types';
import { fetchJson } from '../../lib/api';

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR<Product>(id ? `/api/products/${id}` : null, fetchJson);

  if (error) return <div>Error loading product</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4 space-y-2">
      <img src={data.imageUrl} alt={data.name} className="w-full h-60 object-cover" />
      <h1 className="text-xl font-semibold">{data.name}</h1>
      <p>{data.description}</p>
      <p>Price: KES {data.price}</p>
      <p>Type: {data.type}</p>
      {data.type === 'physical' && <p>Stock: {data.inventory}</p>}
    </div>
  );
}
