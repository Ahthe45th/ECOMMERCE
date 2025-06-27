import { useRouter } from 'next/router';
import useSWR from 'swr';
import ProductCard from '../../components/ProductCard';
import Spinner from '../../components/Spinner';
import { Product } from '../../types';
import { useCart } from '../../lib/cart';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const { addItem } = useCart();

  const { data: product, error } = useSWR<Product>(
    id ? `/api/products/${id}` : null,
    fetcher
  );
  const { data: products } = useSWR<Product[]>('/api/products', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!product) return <Spinner />;

  const others = products?.filter(p => p._id !== id) || [];

  const checkoutNow = () => {
    addItem(product);
    router.push('/checkout');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="border p-4 space-y-2">
        <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover" />
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p>{product.description}</p>
        <p className="font-bold">KES {product.price}</p>
        <div className="space-x-2">
          <button className="bg-green-500 text-white px-3 py-1" onClick={() => addItem(product)}>
            Add to Cart
          </button>
          <button className="bg-blue-600 text-white px-3 py-1" onClick={checkoutNow}>
            Checkout
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Other Products</h3>
        <div className="grid grid-cols-2 gap-4">
          {others.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
