import React, { useState } from 'react'
import { ProfileContext } from '@/stores/ProfileContext'
import { useContext } from 'react'
import InputGroup from '@/components/form-components/InputGroup'
import SubmitButton from '@/components/form-components/SubmitButton'
import { useTrainee } from '@/hooks/api/trainee'

function PasswordForm() {
    const { Yup, user, setUtilsState } = useContext(ProfileContext)
    const [error, setError] = useState()
    const { patch: updatePassword } = useTrainee('updatePassword')
    const rules = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters long')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
        confirmPassword: Yup.string()
            .required('Confirm password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const formObject = Object.fromEntries(formData.entries());

        try {
            await rules.validate(formObject, ({ abortEarly: false }))
            const { data } = await updatePassword(user.traineeid, formObject)

            setUtilsState(prevState => ({
                ...prevState,
                activeForm: 4,
                updateResponse: data,
            }))
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {})
            setError(errors)
        }
    }

    return (
        <div className='basis-full flex flex-col gap-2 bg-white p-5'>
            <form onSubmit={handleSubmit}>
                <div className="w-full">
                    <InputGroup id="password" name="password" label="Password" placeholder="Enter Password" type="password"
                        isError={error && error.password} errorMessage={error && error.password} />
                </div>
                <div className="w-full">
                    <InputGroup id="confirmPassword" name="confirmPassword" label="Re-enter Password"
                        type="password" placeholder="Re-enter Password"
                        isError={error && error.confirmPassword} errorMessage={error && error.confirmPassword} />
                </div>
                <div className='w-full'>
                    <SubmitButton className="mt-2 w-4/12 align" title="Update" />
                </div>
            </form>
        </div>
    )
}

export default PasswordForm
