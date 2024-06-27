import React from 'react'
import Link from 'next/link'

function BottomNavigationItem({ to, label, isActive, icon, className = '', ...props }) {
    const activeStyle = isActive ? " text-xl font-bold text-indigo-400" : ' text-slate-200'
    const borderStyle = isActive && " border-2 border-blue-600 "
    return (
        <Link href={to} className={`${borderStyle} ${className} inline-flex flex-col items-center text-center justify-center px-5 
        hover:bg-gray-50 dark:hover:bg-gray-800 group`}>
            <svg className="w-4 h-4 mb-2 text-slate-50 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d={icon} />
            </svg>
            <span className={`${activeStyle} text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500`}>{label}</span>
        </Link>
    )
}

export default BottomNavigationItem
