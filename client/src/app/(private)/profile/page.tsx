'use client';
import { useState } from 'react';
import ProfileForm from './form';
import PostsContainer from '@/app/components/posts-container';

export default function Profile (): JSX.Element {
  const [pageState, setPageState] = useState<number>(1);

  const postPages = [];
  for (let i = 0; i < pageState; i++) {
    postPages.push(<PostsContainer key={i} page={i} url={`${process.env.NEXT_PUBLIC_API_URL}/api/posts`}/>);
  }

  return (
    <div className='flex flex-col w-full'>
      <ProfileForm />
      {postPages}
      <button
        onClick={() => { setPageState(pageState + 1); }}
        className='mt-4 rounded-lg bg-slate-600 px-4 py-2'
      >Load more...</button>
    </div>
  );
}
