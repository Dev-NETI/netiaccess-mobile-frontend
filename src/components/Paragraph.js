import React from 'react'

function Paragraph({ className, value }) {
    return (
        <p className={`${className} font-semibold italic text-gray-500 text-sm`}>
            {value}
        </p>
    )
}

export default Paragraph
