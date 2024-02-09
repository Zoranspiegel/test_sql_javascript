'use client';
import Post from './post';
import useSWR from 'swr';

export default function PostsContainer ({
  page,
  url,
  username
}: {
  page: number
  url: string
  username?: string
}): JSX.Element {
  const { data, isLoading, error } = useSWR(`${url}?page=${page}${username ? `&username=${username}` : ''}`);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>ERROR</div>;
  return (
    <ul className='flex flex-col'>
      {data?.map((post: Post) => (
        <div key={post.id} className='mb-4'>
          <Post post={post} />
        </div>
      ))}
    </ul>
  );
}
