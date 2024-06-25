'use client'
import React from 'react'
import { useFormStatus } from 'react-dom'

function SubmitButton({ type = 'submit', className, title = "Create", ...props }) {
    const { pending } = useFormStatus();
    let buttonStyle = pending ? ' bg-gray-500 ' : ' bg-blue-900 '

    return (
        <button
            type={type}
            className={`${className} ${buttonStyle} block w-full text-slate-200 rounded-3xl px-3 py-3 text-center text-sm font-semibold shadow-sm `}
            {...props}
            disabled={pending}
        >
            {pending ? 'Creating...' : title}
        </button>
    )
}

export default SubmitButton