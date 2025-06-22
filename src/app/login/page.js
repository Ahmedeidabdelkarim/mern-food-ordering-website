"use client";
import { useState, Suspense } from 'react';
import {signIn} from "next-auth/react";
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  async function handleFormSubmit(e) {
    e.preventDefault();

    setLoginInProgress(true);

    signIn('credentials', { email, password ,callbackUrl: '/' });

    setLoginInProgress(false);
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <section className="my-8">
        <h1 className='text-4xl text-center text-primary mb-4'>Login</h1>
        {error === 'OAuthAccountNotLinked' && (
          <div className="text-red-500 text-center mb-4">
            This email is already registered. Please login with your email and password, then link your Google account from your profile.
          </div>
        )}
        <form className='block max-w-xs mx-auto' onSubmit={handleFormSubmit}>
          <input type="email" disabled={loginInProgress} value={email} id="email" placeholder='Email' name="email" required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" disabled={loginInProgress} value={password} id="password" placeholder='Password' name="password" required onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" disabled={loginInProgress}>Login</button>
          <div className='my-4 text-center text-gray-400'>
            or login with provider
          </div>
          <button 
            type='button' 
            onClick={() => signIn('google', {
              callbackUrl: '/',
              redirect: true
            })} 
            disabled={loginInProgress} 
            className='flex gap-4 justify-center'>
            <Image 
              src={'/google.png'} 
              alt="Google logo" 
              width={24} 
              height={24}
              style={{ width: 'auto', height: '24px' }} 
            />
            Login with google
          </button>
        </form>
      </section>
    </Suspense>
  )
}

export default LoginPage