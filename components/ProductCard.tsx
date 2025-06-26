import Image from 'next/image';
import { Product } from '../types';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <div className="border rounded p-2">
      <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.description}</p>
      <p className="font-bold">KES {product.price}</p>
      <p className="text-xs text-gray-600">{product.type}</p>
    </div>
  );
}
