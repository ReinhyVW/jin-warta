import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@heroui/react";

export default async function Home() {
  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-8'>
      <h1 className='text-4xl font-bold'>Welcome to Jin Warta</h1>
      <p className='text-lg'>Jin Warta is a free and open source app for managing your contributions, expenses, resolutions and more.</p>

      <section className="flex flex-col gap-4 w-full mx-4">
        <h2>Actions</h2>
        <Button as="a" href="/transaction/new">Create new Transaction</Button>
      </section>

      <SignOutButton><Button color='danger' className='max-w-xs w-full' size='lg'>Sign Out</Button></SignOutButton>
    </div>
  )
}
