'use client'
import React, { useState } from 'react'
import PasswordHeader from '@/components/profile/password/header'
import ResetPasswordForm from '@/components/profile/password/ResetPasswordForm'
import ResponseView from '@/components/profile/password/Response'
import { useAuth } from '@/hooks/auth'

function page() {
    const [response, setResponse] = useState(null);
    const [verified, setVerified] = useState(false);
    const { user } = useAuth({ middleware: 'auth' })
    const title = verified ? 'Create New Password' : 'Reset Password';
    const label = verified ? 'This password should be different from your previous password.' : 'Please enter the email address associated with your account, and we will send you an email with a verification code to reset your password.';

    let UI = response === null ?
        (
            <>
                <PasswordHeader title={title} label={label} />
                <ResetPasswordForm traineeId={user.traineeid} handleResponse={setResponse} />
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
