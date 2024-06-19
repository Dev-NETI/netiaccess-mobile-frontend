import React from 'react'
import Badge from '../Badge'

function InputGroupV2({ placeholder, className, isError = false, errorMessage, ...props }) {
    return (
        <>
            <input placeholder={placeholder}
                className={`${className} rounded-full w-full `} {...props} />
            {isError && <Badge className="bg-red-600 text-stone-300 mt-5" message={errorMessage} />}
        </>
    )
}

export default InputGroupV2
