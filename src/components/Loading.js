import React from 'react'
import Image from 'next/image'

function Loading({ label }) {
    return (
        <div className="flex flex-col items-center justify-center w-72 h-72 border bg-stone-300
        border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700">

            <div className='basis-full '>
                <Image src="/assets/system/NETI.png" alt="NETI Logo" width={250} height={250} priority />
            </div>

            <div className='basis-full'>
                <div className="px-3 py-1 text-xl font-medium leading-none text-center 
            text-blue-900 bg-blue-400 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
                    {label}
                </div>
            </div>

        </div>
    )
}

export default Loading
