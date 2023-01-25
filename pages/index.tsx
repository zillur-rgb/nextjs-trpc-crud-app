import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { trpc } from '~/utils/trpc';

const Home: NextPage = () => {
  const hello = trpc.getHello.useQuery();
  return (
    <div className="max-w-lg mx-auto h-40 p-6 mt-8 text-xl font-medium rounded-sm bg-white">
      {hello.data?.message}
    </div>
  );
};

export default Home;
