'use client';
import PostsContainer from '@/app/components/posts-container';
import { useState } from 'react';

export default function Feed (): JSX.Element {
  const [pageState, setPageState] = useState<number>(1);

  const postPages = [];
  for (let i = 0; i < pageState; i++) {
    postPages.push(<PostsContainer key={i} page={i} url={`${process.env.NEXT_PUBLIC_API_URL}/api/posts/feed`}/>);
  }

  return (
    <div className='flex flex-col items-center'>
      {postPages}
      <button
        onClick={() => { setPageState(pageState + 1); }}
        className='mt-4 rounded-lg bg-slate-600 px-4 py-2'
      >Load more...</button>
    </div>
  );
}
