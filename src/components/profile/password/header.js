import React from 'react'

function PasswordHeader() {
    return (
        <>
            <div className='basis-full px-5 '>
                <p className='font-bold text-2xl font-sans mt-5'>
                    Create New Password
                </p>
            </div>
            <div className='basis-full px-5'>
                <p className='font-bold text-sm text-stone-500 font-sans italic'>
                    This password should be different from your previous password.
                </p>
            </div>
        </>
    )
}

export default PasswordHeader
