import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools/build/lib/devtools';
import { trpc } from '~/utils/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </>
  );
}

export default trpc.withTRPC(MyApp);
