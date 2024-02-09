'use client';
import useSWR from 'swr';
import Link from 'next/link';
import User from '../components/user';

export default function Header (): JSX.Element {
  const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  return (
    <header
      className='flex max-w-md w-full justify-around items-center rounded-lg bg-slate-800 p-4'
    >
      <Link
        href='/'
        className='text-2xl font-bold'
      >
        TestSQL
      </Link>
      <User user={data} href='account'/>
    </header>
  );
}
