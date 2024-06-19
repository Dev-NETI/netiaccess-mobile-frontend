import React from 'react'
import Button from '@/components/Button'
import Link from 'next/link'

function ResponseView({ response }) {
    let label = response ? 'Success!' : 'Whoops!';
    let svg = response ?
        'm8.032 12 1.984 1.984 4.96-4.96m4.55 5.272.893-.893a1.984 1.984 0 0 0 0-2.806l-.893-.893a1.984 1.984 0 0 1-.581-1.403V7.04a1.984 1.984 0 0 0-1.984-1.984h-1.262a1.983 1.983 0 0 1-1.403-.581l-.893-.893a1.984 1.984 0 0 0-2.806 0l-.893.893a1.984 1.984 0 0 1-1.403.581H7.04A1.984 1.984 0 0 0 5.055 7.04v1.262c0 .527-.209 1.031-.581 1.403l-.893.893a1.984 1.984 0 0 0 0 2.806l.893.893c.372.372.581.876.581 1.403v1.262a1.984 1.984 0 0 0 1.984 1.984h1.262c.527 0 1.031.209 1.403.581l.893.893a1.984 1.984 0 0 0 2.806 0l.893-.893a1.985 1.985 0 0 1 1.403-.581h1.262a1.984 1.984 0 0 0 1.984-1.984V15.7c0-.527.209-1.031.581-1.403Z'
        :
        'm15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
    let className = response ? 'text-blue-700 animate-pulse ' : 'text-red-500 animate-pulse '
    let description = response ? 'Your password has been successfully reset. Please log in again.' : 'Something went wrong'
    let route = response ? '/login' : '/profile'
    let buttonLabel = response ? 'Login' : 'Go back'

    return (
        <>
            <div className='basis-full px-5 '>
                <svg className={`${className} w-32 h-32 mx-auto dark:text-white mt-10 `} aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={svg} />
                </svg>
            </div>
            <div className='basis-full px-5 flex justify-center'>
                <p className='font-bold text-2xl'>
                    {label}
                </p>
            </div>
            <div className='basis-full px-5 flex justify-center'>
                <p className='font-bold text-sm italic text-gray-600 text-justify' >
                    {description}
                </p>
            </div>
            <div className='basis-full px-5 flex justify-center'>
                <Link href={route} className='w-full'>
                    <Button type="submit" >
                        {buttonLabel}
                    </Button>
                </Link>
            </div>
        </>
    )
}

export default ResponseView
