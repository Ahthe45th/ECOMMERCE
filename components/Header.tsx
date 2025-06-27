import Link from 'next/link';
import { useCart } from '../lib/cart';

export default function Header() {
  const { items } = useCart();
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="font-bold">Mtumba Online</Link>
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/checkout">Cart ({items.length})</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  );
}
