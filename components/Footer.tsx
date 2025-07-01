import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white text-sm text-center py-6 mt-10">
      <div className="max-w-5xl mx-auto">
        <div>&copy; {new Date().getFullYear()} Mtumba Online</div>
        <div className="mt-2 space-x-4 flex justify-center">
          <a
            href="#"
            className="hover:text-blue-500 inline-flex items-center gap-1"
          >
            <FaFacebook className="w-5 h-5" /> Facebook
          </a>
          <a
            href="#"
            className="hover:text-blue-400 inline-flex items-center gap-1"
          >
            <FaTwitter className="w-5 h-5" /> Twitter
          </a>
          <a
            href="#"
            className="hover:text-pink-500 inline-flex items-center gap-1"
          >
            <FaInstagram className="w-5 h-5" /> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
