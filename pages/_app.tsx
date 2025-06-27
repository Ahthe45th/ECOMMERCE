import type { AppProps } from 'next/app';
import '../styles/globals.css';
import WhatsAppButton from '../components/WhatsAppButton';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartProvider } from '../lib/cart';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </CartProvider>
  );
}
