import React from 'react'
import ValidationErrorItem from './ValidationErrorItem'

function ValidationError({ className, title, errors = [] }) {
    return (
        <div className={`${className} bg-red-300 rounded-lg mb-1 px-3 shadow-2xl py-2`}>
            <h1 className="font-bold text-red-600 text-base">{title}</h1>
            <ul className='py-1'>
                {
                    errors.map((item) => (
                        <ValidationErrorItem key={item.message} errorDescription={item.message} />
                    ))
                }
            </ul>
        </div>
    )
}

export default ValidationError
