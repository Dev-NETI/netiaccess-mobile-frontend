import React from 'react'
import Image from 'next/image'
import appLogo from '/public/assets/system/130e36d3f509dc4d3ceb59625dc42afa.png'

function AppLogo() {
    return (
        <Image
            src={appLogo}
            alt="NETI Logo"
            className="h-24 w-24 rounded-full object-cover"
            priority={true}
        />
    )
}

export default AppLogo
