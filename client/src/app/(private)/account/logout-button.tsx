'use client';
import { useRouter } from 'next/navigation';

export default function LogoutButton (): JSX.Element {
  const router = useRouter();

  async function handleLogout (): Promise<void> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
      credentials: 'include'
    });
    if (res.ok) {
      router.push('/');
    }
  }
  return (
    <button
    onClick={handleLogout}
      className='text-slate-400'
    >Log Out</button>
  );
}
