import React from 'react'
import Link from 'next/link'

function InformationLinkItem({ href, label }) {
    return (
        <Link href={href}>
            <div className='basis-full border-b border-stone-300 py-3 
            grid grid-cols-6'>
                <div className='col-start-1 col-span-5'>
                    <p className='text-stone-900 font-semibold '>
                        {label}
                    </p>
                </div>
                <div className='col-start-6 col-span-1'>
                    <p className='text-stone-900 font-semibold float-end'>
                        <svg className="h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                        </svg>
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default InformationLinkItem
