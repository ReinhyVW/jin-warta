import { Button } from '@heroui/react';

export default function Home() {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-8'>
      <Button color='primary' className='max-w-xs w-full' size='lg' as={"a"} href=''>Login</Button>
      <Button color='secondary' className='max-w-xs w-full' size='lg' as={"a"} href=''>Sign Up</Button>
    </div>
  )
}
