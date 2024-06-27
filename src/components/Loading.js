import React from 'react'
import Image from 'next/image'

function Loading({ label = null }) {
    return (
        <div className="bg-white flex flex-col items-center justify-center ">

            <div className='basis-full '>

            </div>

            <div className='basis-full'>
                <Image src="/assets/system/NETI.png" className='animate-pulse' alt="NETI Logo" width={250} height={250} priority />
            </div>

        </div>
    )
}

export default Loading
