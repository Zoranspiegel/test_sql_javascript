import Link from 'next/link';

export default function Home (): JSX.Element {
  return (
    <main className='flex min-h-screen justify-center items-center'>
      <div className='flex flex-col justify-center items-center w-full max-w-xs rounded-xl bg-slate-800 p-4 gap-4'>
        <h1 className='font-bold text-2xl'>TestSQL</h1>
        <Link
          href='/login'
          className='bg-slate-600 w-full text-center rounded-lg py-2'
        >Log In</Link>
        <Link
          href='/signup'
          className='bg-slate-600 w-full text-center rounded-lg py-2'
        >Sign Up</Link>
      </div>
    </main>
  );
}
