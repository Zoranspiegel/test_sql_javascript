'use client';
import UsersContainer from '@/app/components/users-container';
import { useState } from 'react';

export default function Following (): JSX.Element {
  const [pageState, setPageState] = useState<number>(1);

  const userPages = [];
  for (let i = 0; i < pageState; i++) {
    userPages.push(<UsersContainer key={i} page={i} url={`${process.env.NEXT_PUBLIC_API_URL}/api/following`}/>);
  }
  return (
    <div>
      {userPages}
      <button
        onClick={() => { setPageState(pageState + 1); }}
        className='mt-4 rounded-lg bg-slate-600 px-4 py-2'
      >Load more...</button>
    </div>
  );
}
