import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link href="/" className="font-bold">Mtumba Online</Link>
      <nav className="space-x-4">
        <Link href="/">Home</Link>
        <Link href="/checkout">Checkout</Link>
        <Link href="/admin">Admin</Link>
      </nav>
    </header>
  );
}
