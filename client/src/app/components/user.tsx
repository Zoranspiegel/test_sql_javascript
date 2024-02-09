import Image from 'next/image';
import Link from 'next/link';

export default function User ({
  user,
  href
}: {
  user: User
  href?: UserHref
}): JSX.Element {
  return (
    <div>
      <Link
        href={href ?? user.username}
        className='flex items-center gap-2'
      >
        {user.avatar && (
          <Image
            src={user.avatar}
            alt={user.username}
            width={50}
            height={50}
            className='rounded-full'
          />
        )}
        {!user.avatar && (
          <div className='w-[50px] h-[50px] rounded-full bg-slate-600'></div>
        )}
        <div>{user.username}</div>
      </Link>
    </div>
  );
}
