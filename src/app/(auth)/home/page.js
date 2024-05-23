import React from 'react'
import H2 from '@/components/H2'
import Button from '@/components/Button'
import Link from 'next/link'

function Home() {
    return (
        <div className="grid grid-cols-1 ">
            <div className="col-span-1 mx-2 flex flex-col items-center">
                <div className="w-full text-center">
                    <H2 value="OEX"></H2>
                </div>
                <div className="w-full mt-2 text-center">
                    <H2 value="Online Enrollment X"></H2>
                </div>
                <div className="w-full mt-24">
                    <Link href="/login">
                        <Button
                            type="button"
                            className=""
                        >
                            Log In
                        </Button>
                    </Link>
                </div>
                <div className="w-full mt-4">
                    <Link href="/register">
                        <Button
                            className="bg-stone-100 border-2 border-blue-900 text-blue-900"
                        >
                            Create an account
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home
