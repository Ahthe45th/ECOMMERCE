import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white text-sm text-center py-4 mt-10">
      <div>&copy; {new Date().getFullYear()} Mtumba Online</div>
      <div className="mt-2 space-x-4 flex justify-center">
        <a href="#" className="hover:underline inline-flex items-center gap-1">
          <FaFacebook /> Facebook
        </a>
        <a href="#" className="hover:underline inline-flex items-center gap-1">
          <FaTwitter /> Twitter
        </a>
        <a href="#" className="hover:underline inline-flex items-center gap-1">
          <FaInstagram /> Instagram
        </a>
      </div>
    </footer>
  );
}
