import React from 'react'
import Link from 'next/link'

function BottomNavigationItem({to,label,isActive,...props}) {
    const activeStyle = isActive ? " text-xl font-bold text-indigo-400" : ' text-slate-200'

    return (
        <div className='w-full' {...props}>
            <Link href={to}>
                <p className={`${activeStyle} `}>{label}</p>
            </Link>
        </div>
    )
}

export default BottomNavigationItem
