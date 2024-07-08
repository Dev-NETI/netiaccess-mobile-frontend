import React from 'react'

function PasswordHeader({ title, label }) {
    return (
        <>
            <div className='basis-full px-5 '>
                <p className='font-bold text-2xl font-sans mt-5'>
                    {title}
                </p>
            </div>
            <div className='basis-full px-5 py-2'>
                <p className='font-bold text-sm text-stone-500 font-sans italic text-justify'>
                    {label}
                </p>
            </div>
        </>
    )
}

export default PasswordHeader
