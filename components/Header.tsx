import Link from 'next/link';
import { useCart } from '../lib/cart';

export default function Header() {
  const { items } = useCart();
  return (
    <header className="bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold hover:opacity-90">
          Mtumba Online
        </Link>
        <nav className="space-x-6">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/checkout" className="hover:underline">
            Cart ({items.length})
          </Link>
          <Link href="/admin" className="hover:underline">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
