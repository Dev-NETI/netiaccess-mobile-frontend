import React from 'react'
import Image from 'next/image'
import appLogo from '/public/assets/system/130e36d3f509dc4d3ceb59625dc42afa.png'

function layout({ children }) {
    return (
        <div className="flex flex-col h-screen w-screen">
            <div className="basis-5/12 bg-nykBlue flex justify-center items-center py-4">
                <div className="bg-white rounded-full flex justify-center items-center">
                    <Image
                        src={appLogo}
                        alt="NETI Logo"
                        className="h-24 w-24 rounded-full object-cover"
                        priority={true}
                    />
                </div>
            </div>

            <div className="basis-7/12 ">{children}</div>
        </div>
    )
}

export default layout
