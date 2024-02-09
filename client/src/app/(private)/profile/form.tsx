'use client';
import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { mutate } from 'swr';

export default function ProfileForm (): JSX.Element {
  const [contentState, setContentState] = useState<string>('');

  function handleChange (e: ChangeEvent<HTMLTextAreaElement>): void {
    setContentState(e.target.value);
  }

  async function handleSubmit (e: FormEvent): Promise<void> {
    e.preventDefault();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ content: contentState })
    });

    if (res.ok) {
      setContentState('');
      mutate((key: string) => key.startsWith(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`))
        .catch(error => { console.error(error); });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='flex flex-col items-start gap-2 mb-4'
    >
      <textarea
        value={contentState}
        onChange={handleChange}
        rows={5}
        placeholder='What are you thinking...'
        className='rounded-lg w-full max-w-xs bg-slate-600 resize-none py-2 px-4'
      />
      <button
        type='submit'
        className='rounded-lg bg-slate-600 px-4 py-1'
      >Post</button>
    </form>
  );
}
