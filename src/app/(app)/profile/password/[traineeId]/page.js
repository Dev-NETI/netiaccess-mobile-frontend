'use client'
import React, { useState } from 'react'
import PasswordHeader from '@/components/profile/password/header'
import ResetPasswordForm from '@/components/profile/password/ResetPasswordForm'
import ResponseView from '@/components/profile/password/Response'

function page({ params }) {
    const [response, setResponse] = useState(null);

    let UI = response === null ?
        (
            <>
                <PasswordHeader />
                <ResetPasswordForm traineeId={params.traineeId} handleResponse={setResponse} />
            </>
        )
        :
        <ResponseView response={response} />

    return (
        <div className='flex flex-col gap-4 bg-gray-50 mx-10 my-10 py-4
        border-0 rounded-xl shadow-xl'>
            {UI}
        </div>
    )
}

export default page
