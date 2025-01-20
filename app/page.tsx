import { SignInButton, SignUpButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { Button } from '@heroui/react';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = await auth()

  userId && redirect('/home')

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-8'>
      <SignInButton mode='modal'><Button color='primary' className='max-w-xs w-full' size='lg'>Sign In</Button></SignInButton>
      <SignUpButton mode='modal'><Button color='secondary' className='max-w-xs w-full' size='lg'>Sign Up</Button></SignUpButton>
    </div>
  )
}
