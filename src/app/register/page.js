"use client";
import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
import {signIn} from "next-auth/react";

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handelFormSubmit(e) {
    e.preventDefault();

    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    
    const res = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
    });

    if (res.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }

    setCreatingUser(false);
  };

  return (
    <section className="my-8">
      <h1 className='text-4xl text-center text-primary mb-4'>Register</h1>

      {userCreated && (
        <div className='my-4 text-center'>
          User created.<br/>
          Now you can{' '}
          <Link href="/login" className='underline'>login &raquo;</Link>
        </div>
      )}

      {error && (
        <div className='my-4 text-center text-red-500'>
          Error.<br/>
          Please try again later or contact support.
        </div>
      )}

      <form className='block max-w-xs mx-auto' onSubmit={handelFormSubmit}>
          <input type="email" id="email" disabled={creatingUser} placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} name="email" required />
          <input type="password" id="password" disabled={creatingUser} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} name="password" required />
          <button type="submit" disabled={creatingUser}>Register</button>
          <div className='my-4 text-center text-gray-400'>
            or login with provider
          </div>
          <button 
            onClick={() => signIn('google', {
              callbackUrl: '/',
              redirect: true
            })} 
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

          <div className='my-4 text-center text-gray-400'>
            Already have an account?{' '}
            <Link href="/login" className='underline'>Login &raquo;</Link>
          </div>
      </form>
    </section>
  )
}

export default RegisterPage