import type { AppProps } from 'next/app';
import '../styles/globals.css';
import WhatsAppButton from '../components/WhatsAppButton';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <WhatsAppButton />
    </>
  );
}
