'use client';

import dynamic from 'next/dynamic';

const Page = dynamic(() => import('../components/dynamic'));

export default function Home() {
  return <Page />;
}
