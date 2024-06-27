import React from 'react'
import H2 from '@/components/H2'
import Button from '@/components/Button'
import Link from 'next/link'

function Home() {
    return (
        <div className='flex flex-col justify-center gap-4'>
            <div className='basis-full flex justify-center mt-20'>
                <H2 value="NETI-OEX" className=" text-4xl font-sans " />
            </div>
            <div className='basis-full px-10 mt-64'>
                <Link href="/login">
                    <Button
                        type="button"
                        className=" text-lg shadow-2xl  "
                    >
                        Log In
                    </Button>
                </Link>
            </div>
            <div className='basis-full px-10'>
                <Link href="/register">
                    <Button
                        className=" text-lg bg-stone-100 border-2 border-blue-900 text-stone-900 shadow-2xl "
                    >
                        Create an account
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default Home
