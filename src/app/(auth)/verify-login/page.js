'use client'
import React from 'react'
import H2 from '@/components/H2'
import Paragraph from '@/components/Paragraph'
import VerificationFields from '@/components/profile/password/VerificationFields'

function VerifyLogin() {
    return (
        <div className='p-5'>
            <H2 value="Verify login" className="" />
            <Paragraph
                styles="mt-10"
                value="Sign in with your email and password."
            />
            <VerificationFields mode="verify-login" />
        </div>
    )
}

export default VerifyLogin
