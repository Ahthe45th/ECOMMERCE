import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../types';
import { useCart } from '../lib/cart';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  return (
    <div className="border rounded p-2 space-y-2">
      <Link href={`/products/${product._id}`}> 
        <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
        <h3 className="font-semibold mt-2">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="font-bold">KES {product.price}</p>
      </Link>
      <button className="bg-green-500 text-white px-2 py-1 w-full" onClick={() => addItem(product)}>
        Add to Cart
      </button>
    </div>
  );
}
