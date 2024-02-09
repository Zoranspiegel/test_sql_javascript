import Link from 'next/link';
import Image from 'next/image';

export default function Post ({
  post
}: { post: Post }): JSX.Element {
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  const postDate = new Date(post.created_at).toLocaleDateString('en-us', dateOptions);

  return (
    <div className='flex gap-4'>
      <div>
        <Link href={post.username}>
          {post.avatar && (
            <Image
              src={post.avatar}
              alt={post.username}
              width={50}
              height={50}
              className='rounded-full'
            />
          )}
          {!post.avatar && (
            <div className='w-[50px] h-[50px] rounded-full bg-slate-600'></div>
          )}
        </Link>
      </div>
      <div>
        <Link
          href={post.username}
          className='font-bold'
        >{post.username}</Link>
        <div className='text-slate-400'>{postDate}</div>
        <div className='flex max-w-xs'>{post.content}</div>
      </div>
    </div>
  );
}
