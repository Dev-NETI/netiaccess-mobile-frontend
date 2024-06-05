import React from 'react'

function Return({ ...props }) {
    return (
        <p className=" mb-24  basis-full text-blue-500 font-semibold mx-auto hover:text-blue-600"
            {...props}>Back</p>
    )
}

export default Return
