'use client';
import useSWR from 'swr';
import Image from 'next/image';

export default function AvatarForm (): JSX.Element {
  const { data, isLoading, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>ERROR</div>;

  const user: User = data;
  return (
    <form className='flex flex-col'>
      <h1 className='text-center text-3xl font-bold'>
        {user.username}
      </h1>
      {user.is_admin && (<h2 className='text-center text-orange-500 font-bold'>Admin</h2>)}
      <Image
        src={user.avatar}
        alt={user.username}
        width={200}
        height={200}
        className='m-auto rounded-full my-10'
      />
      <input
        id='fileInput'
        type='file'
        className='m-auto'
      />
    </form>
  );
}
