import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import UserProvider from '../configs/UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
