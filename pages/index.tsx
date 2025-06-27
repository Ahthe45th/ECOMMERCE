import useSWR from 'swr';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { Product } from '../types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR<Product[]>('/api/products', fetcher);

  const hero = (
    <section className="relative h-64 flex items-center justify-center text-white mb-4">
        <img
          src="https://source.unsplash.com/random/900x600?clothes"
          alt="Store"
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="relative text-center space-y-2">
          <h1 className="text-2xl font-bold">Quality Second-hand Clothing</h1>
          <p>Affordable styles for everyone</p>
          <a
            href="#products"
            className="inline-block bg-green-600 px-4 py-2 rounded text-white"
          >
            See Products
          </a>
        </div>
      </section>
  );

  if (error)
    return (
      <div>
        {hero}
        <div className="text-center text-red-600">Failed to load</div>
      </div>
    );

  return (
    <div>
      {hero}
      {!data ? (
        <Spinner />
      ) : (
        <div id="products" className="grid grid-cols-2 gap-4 p-4">
          {data.map(p => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
