import React from 'react'
import Link from 'next/link'

function Back({route}) {
    return (
        <Link href={route}>
            <p className='text-blue-600 font-semibold text-sm'>Back</p>
        </Link>
    )
}

export default Back
