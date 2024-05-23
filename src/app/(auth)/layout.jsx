import React from 'react'
import Image from 'next/image'
import appLogo from '/public/assets/system/130e36d3f509dc4d3ceb59625dc42afa.png'

function layout({ children }) {
    return (
        <div className="grid grid-rows-2 h-screen">
            <div className="col-span-1 bg-nykBlue flex justify-center items-center h-96">
                <div className="h-32 w-32 bg-white rounded-full flex justify-center items-center">
                    <Image
                        src={appLogo}
                        alt="NETI Logo"
                        className="h-24 w-24 rounded-full object-cover"
                        priority={true}
                    />
                </div>
            </div>
            <div className="col-span-1 h-full">{children}</div>
        </div>
    )
}

export default layout
