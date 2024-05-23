import React from 'react'

function Badge({ className, message }) {
    return (
        <span className={`${className}  text-xs font-medium px-2.5 py-0.5 rounded 
        dark:bg-red-900 dark:text-red-300`}>
            {message}
        </span>
    )
}

export default Badge
