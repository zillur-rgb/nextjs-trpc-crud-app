import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import { trpc } from '~/utils/trpc';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default trpc.withTRPC(MyApp);
