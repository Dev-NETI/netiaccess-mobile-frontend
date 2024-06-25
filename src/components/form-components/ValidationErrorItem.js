import React from 'react'

function ValidationErrorItem({ errorDescription }) {
    return (
        <li className="flex items-center mt-1">
            <svg className="w-4 h-4 text-gray-200 dark:text-white rounded-full border-0 bg-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
            </svg>
            <p className='text-xs text-red-600 font-semibold ml-2'>{errorDescription}</p>
        </li>
    )
}

export default ValidationErrorItem
