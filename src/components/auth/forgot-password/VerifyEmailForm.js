import React, { useEffect, useState } from 'react'
import VerificationCodeField from '@/components/auth/VerificationCodeField'
import { handleInputChange } from '@/utils/utils'
import { generateRandomNumbers } from '@/utils/utils';
import Badge from '@/components/Badge';
import Button from '@/components/Button';

function VerifyEmailForm({ handleSetState }) {
    const [utilState, setUtilState] = useState({
        verificationCode: null,
        error: null,
    })

    useEffect(() => {
        setUtilState(prevState => ({ ...prevState, verificationCode: generateRandomNumbers() }))
    }, [])
    console.log(utilState.verificationCode)

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target)
        const object = Object.fromEntries(formData.entries())
        const enteredVerificationCode = object['input1'] + object['input2'] + object['input3'] + object['input4'] + object['input5'] + object['input6'];

        const isError = enteredVerificationCode !== utilState.verificationCode
        setUtilState(prevState => ({ ...prevState, error: isError }))

        if (!isError) {
            handleSetState(prevState => ({ ...prevState, activeForm: 3 }))
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='flex flex-row gap-2'>
                <VerificationCodeField handleInputChange={handleInputChange} />
            </div>
            <div className='flex mt-2'>
                {utilState.error && <Badge className="bg-red-400 text-red-800" message={utilState.error && 'Invalid verification code!'} />}
            </div>
            <Button className='mt-2' >Verify</Button>
        </form>
    )
}

export default VerifyEmailForm
