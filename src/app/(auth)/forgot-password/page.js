'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import Label from '@/components/Label'
import { useState } from 'react'
import { useTrainee } from '@/hooks/api/trainee'
import * as Yup from 'yup'
import Badge from '@/components/Badge'
import Back from '@/components/Back'
import ResetPasswordForm from '@/components/auth/forgot-password/ResetPasswordForm'
import VerifyEmailForm from '@/components/auth/forgot-password/VerifyEmailForm'
import ResponseView from '@/components/profile/password/Response'

const Page = () => {
    const { show: checkEmail } = useTrainee('check-email')
    const [utilState, setUtilState] = useState({
        errors: null,
        activeForm: 1,
        enteredEmail: null,
        updateResponse: null,
    })
    const rules = Yup.object().shape({
        email: Yup.string().email('Please enter a valid email address!').required('Email is required!'),
    })

    const submitForm = async (event) => {
        event.preventDefault()

        const formData = new FormData(event.target)
        const object = Object.fromEntries(formData.entries())

        try {
            await rules.validate(object, ({ abortEarly: false }))

            const { data } = await checkEmail(object.email)
            if (!data) {
                return setUtilState(prevState => ({ ...prevState, errors: { email: "Entered email is NOT registered!" } }))
            }

            setUtilState(prevState => ({ ...prevState, enteredEmail: object.email, activeForm: 2 }))
        } catch (error) {
            const err = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setUtilState(prevState => ({ ...prevState, errors: err }))
        }

    }

    let ui, viewLabel;
    switch (utilState.activeForm) {
        case 1:
            viewLabel = 'Forgot your password? No worries! Simply provide us with your email address, and we\'ll send you a verification code to confirm your email and reset your password.'
            ui = <>
                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            className="block mt-1 w-full"
                            autoFocus
                        />

                        {utilState.errors !== null
                            && <Badge className="  text-red-500 text-xl bg-red-200  " message={utilState.errors?.email} />}
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Button>Verify</Button>
                    </div>
                </form>
                <div className='flex justify-center p-2'>
                    <Back route="/login" />
                </div>
            </>
            break;
        case 2:
            viewLabel = 'Please enter the verification code that has been sent to your email address.'
            ui = <VerifyEmailForm handleSetState={setUtilState} />
            break;
        case 3:
            viewLabel = 'Please input a strong password!'
            ui = <>
                <ResetPasswordForm enteredEmail={utilState.enteredEmail} setUtilState={setUtilState} />
            </>
            break;
        default:
            viewLabel = ''
            ui = <>
                <ResponseView response={utilState.updateResponse} successLabel='Your password has been successfully reset'
                    defaultRoute="/login"
                    defaultButtonLabel="Login" />
            </>
            break;
    }

    return (
        <div className='p-7'>
            <div className="mb-4 text-sm text-gray-600 text-justify">
                {viewLabel}
            </div>
            {ui}
        </div>
    )
}

export default Page
