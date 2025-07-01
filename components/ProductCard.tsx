import Image from "next/image";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Product } from "../types";
import { useCart } from "../lib/cart";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  return (
    <div className="bg-white border rounded-lg overflow-hidden shadow transition-transform hover:shadow-xl hover:-translate-y-1">
      <Link
        href={`/products/${product._id}`}
        className="block p-4 space-y-2 text-gray-800"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded"
        />
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="font-bold">KES {product.price}</p>
      </Link>
      <button
        className="bg-green-500 hover:bg-green-600 text-white w-full py-2 font-semibold flex items-center justify-center gap-1 rounded-b"
        onClick={() => addItem(product)}
      >
        <ShoppingCartIcon className="w-5 h-5" /> Add to Cart
      </button>
    </div>
  );
}
