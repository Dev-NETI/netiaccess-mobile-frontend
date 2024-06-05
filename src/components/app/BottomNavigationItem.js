import React from 'react'
import Link from 'next/link'

function BottomNavigationItem({ to, label, isActive, children, ...props }) {
    const activeStyle = isActive ? " text-xl font-bold text-indigo-400" : ' text-slate-200'

    return (
        <Link href={to} className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            {children}
            <span className={`${activeStyle} text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500`}>{label}</span>
        </Link>
    )
}

export default BottomNavigationItem
