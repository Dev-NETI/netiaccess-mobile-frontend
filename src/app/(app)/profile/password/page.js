'use client'
import React, { useState } from 'react'
import PasswordHeader from '@/components/profile/password/header'
import ResponseView from '@/components/profile/password/Response'
import { useAuth } from '@/hooks/auth'
import EnterEmailComponent from '@/components/profile/password/EnterEmailComponent'
import { ProfileContext } from '@/stores/ProfileContext'
import * as Yup from 'yup'
import VerificationFields from '@/components/profile/password/VerificationFields'
import PasswordForm from '@/components/profile/password/PasswordForm'

function page() {
    const [utilsState, setUtilsState] = useState({
        verified: false,
        updateResponse: null,
        activeForm: 1,
        updateResponse: null,
    });
    const { user } = useAuth({ middleware: 'auth' })

    let title, label, ui;
    switch (utilsState.activeForm) {
        case 1:
            title = "Enter email"
            label = "We need to verify your registered email before we update your password."
            ui = <EnterEmailComponent />
            break;
        case 2:
            title = "Enter verification code"
            label = "We need to verify your registered email before we update your password."
            ui = <VerificationFields />
            break;
        case 3:
            title = "New Password"
            label = "Please enter a new and strong password."
            ui = <PasswordForm />
            break;
        default:
            title = ""
            label = ""
            ui = <div className='basis-full bg-white'>
                <ResponseView response={utilsState.updateResponse} successLabel="Password updated successfully!"
                    defaultRoute="/profile" defaultButtonLabel="Go to profile" />
            </div>
            break;
    }

    return (
        <ProfileContext.Provider value={{ Yup, user, setUtilsState }}>
            <div className='basis-full bg-white rounded-t-3xl flex flex-col gap-2 '>
                {<PasswordHeader title={title} label={label} />}
            </div>
            {ui}
        </ProfileContext.Provider>
    )

}

export default page
