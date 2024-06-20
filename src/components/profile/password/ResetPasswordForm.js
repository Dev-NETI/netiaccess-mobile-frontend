import React, { useState } from 'react'
import InputGroupV2 from '@/components/form-components/InputGroupV2'
import Button from '@/components/Button'
import { useTrainee } from '@/hooks/api/trainee'
import Back from '@/components/Back'
import { updateResource } from '@/utils/resource'
import { useAuth } from '@/hooks/auth'

function ResetPasswordForm({ traineeId, handleResponse }) {
    const [error, setError] = useState(false);
    const { user } = useAuth({ middleware: 'auth' })
    const { patch: updatePassword } = useTrainee('updatePassword')
    const inputBorder = "border-gray-400"

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())
        data.traineeId = traineeId

        let isMatch = data.password === data.confirmPassword
        if (!isMatch) {
            setError(true)
        } else {
            setError(false)
            const updateResponse = updateResource(user.traineeid, data, updatePassword)
            handleResponse(updateResponse)
        }

    }

    return (
        <form onSubmit={handleSubmit} className='basis-full flex flex-col gap-6 py-5'>
            <div className='basis-full px-5'>
                <InputGroupV2 type="password" id="password" name="password" placeholder="New Password" className={inputBorder}
                    errorMessage="Please enter a strong password" required />
            </div>
            <div className='basis-full px-5'>
                <InputGroupV2 type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm New Password" className={inputBorder}
                    errorMessage="Please make sure both passwords match!" isError={error} required />
            </div>
            <div className='basis-full px-5'>
                <Button >Reset Password</Button>
            </div>
            <div className='basis-full px-5 flex justify-center'>
                <Back route="/profile" />
            </div>
        </form>
    )
}

export default ResetPasswordForm
