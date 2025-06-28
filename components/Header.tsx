import Link from 'next/link';
import { HomeIcon, ShoppingCartIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useCart } from '../lib/cart';

export default function Header() {
  const { items } = useCart();
  return (
    <header className="bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-md py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="text-2xl font-bold hover:opacity-90">
          Mtumba Online
        </Link>
        <nav className="space-x-6 flex items-center">
          <Link href="/" className="hover:underline inline-flex items-center gap-1">
            <HomeIcon className="w-5 h-5" /> Home
          </Link>
          <Link href="/checkout" className="hover:underline inline-flex items-center gap-1">
            <ShoppingCartIcon className="w-5 h-5" /> Cart ({items.length})
          </Link>
          <Link href="/admin" className="hover:underline inline-flex items-center gap-1">
            <Cog6ToothIcon className="w-5 h-5" /> Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
