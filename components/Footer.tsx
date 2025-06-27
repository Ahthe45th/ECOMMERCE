export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-sm text-center py-4 mt-10">
      <div>&copy; {new Date().getFullYear()} Mtumba Online</div>
      <div className="mt-2 space-x-4">
        <a href="#" className="hover:underline">
          Facebook
        </a>
        <a href="#" className="hover:underline">
          Twitter
        </a>
        <a href="#" className="hover:underline">
          Instagram
        </a>
      </div>
    </footer>
  );
}
