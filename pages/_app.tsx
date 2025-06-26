import type { AppProps } from 'next/app';
import '../styles/globals.css';
import WhatsAppButton from '../components/WhatsAppButton';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
