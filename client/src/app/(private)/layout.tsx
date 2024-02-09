'use client';
import Footer from './footer';
import Header from './header';
import NavBar from './navbar';
import { SWRConfig } from 'swr';
import { fetcher } from '../utils/fetcher';

export default function PrivateLayout ({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className='flex flex-col min-h-screen justify-start items-center py-2 gap-2 box-border'>
        <Header />
        <NavBar />
        <main className='flex flex-grow max-w-md w-full rounded-lg bg-slate-800 p-4'>{children}</main>
        <Footer />
      </div>
    </SWRConfig>
  );
}
