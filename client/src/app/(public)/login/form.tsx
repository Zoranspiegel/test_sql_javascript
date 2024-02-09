'use client';
import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

const userInitialState: UserLogin = {
  username: '',
  password: ''
};

export default function LoginForm (): JSX.Element {
  const router = useRouter();
  const [userState, setUserState] = useState<UserLogin>(userInitialState);
  const [errorState, setErrorState] = useState<string[]>([]);

  function handleChange (e: ChangeEvent<HTMLInputElement>): void {
    setUserState(prevState => {
      return { ...prevState, [e.target.id]: e.target.value };
    });
  }

  async function handleSubmit (e: FormEvent): Promise<void> {
    e.preventDefault();
    setErrorState([]);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userState)
    });

    if (!res.ok) {
      const resJSON = await res.json();
      setErrorState(prevState => [...prevState, resJSON.error]);
    } else {
      router.push('/feed');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=' flex flex-col rounded-xl bg-slate-800 p-4 gap-4'
    >
      <div
        className='flex flex-col'
      >
        <label>
          Username
        </label>
        <input
          id='username'
          value={userState.username}
          onChange={handleChange}
          placeholder='Username...'
          type='text'
          className='py-2 px-4 rounded-lg text-black'
        />
      </div>
      <div
        className='flex flex-col'
      >
        <label>
          Password
        </label>
        <input
          id='password'
          value={userState.password}
          onChange={handleChange}
          placeholder='Password...'
          type='password'
          className='py-2 px-4 rounded-lg text-black'
        />
      </div>
      {errorState.length > 0 && (
        <ul className='flex flex-col justify-center items-center'>
          {errorState.map(error => (
            <li
              key={error}
              className='text-red-600 text-sm list-disc'
            >{error}</li>
          ))}
        </ul>
      )}
      <button
        type='submit'
        className='rounded-lg bg-slate-600 py-2'
      >Log In</button>
    </form>
  );
}
