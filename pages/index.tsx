import useSWR from 'swr';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { Product } from '../types';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR<Product[]>('/api/products', fetcher);

  const hero = (
    <section className="relative h-64 flex items-center justify-center text-white mb-4">
        <img
          src="https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Store"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="relative text-center space-y-2">
          <h1 className="text-2xl font-bold">Quality Second-hand Clothing</h1>
          <p>Affordable styles for everyone</p>
          <a
            href="#products"
            className="inline-flex items-center gap-1 bg-green-600 px-4 py-2 rounded text-white"
          >
            See Products <ArrowDownCircleIcon className="w-5 h-5" />
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
