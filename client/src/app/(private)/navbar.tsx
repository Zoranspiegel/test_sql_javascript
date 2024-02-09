import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar (): JSX.Element {
  const path = usePathname();
  return (
    <nav
      className='flex justify-around items-center max-w-md w-full rounded-lg bg-slate-800 p-4'
    >
      <Link
        href='/feed'
        className={path === '/feed' ? 'text-yellow-400' : ''}
      >Feed</Link>
      <Link
        href='/profile'
        className={path === '/profile' ? 'text-yellow-400' : ''}
      >Profile</Link>
      <Link
        href='/following'
        className={path === '/following' ? 'text-yellow-400' : ''}
      >Following</Link>
      <Link
        href='/followers'
        className={path === '/followers' ? 'text-yellow-400' : ''}
      >Followers</Link>
    </nav>
  );
}
