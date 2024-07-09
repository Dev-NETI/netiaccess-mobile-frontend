import React, { useEffect, useState } from 'react'
import VerificationCodeField from '@/components/auth/VerificationCodeField'
import { handleInputChange } from '@/utils/utils'
import { generateRandomNumbers } from '@/utils/utils';
import Badge from '@/components/Badge';
import Button from '@/components/Button';
import ProgressBarComponent from '@/components/ProgressBarComponent';
import { useEmail } from '@/hooks/api/email'

function VerifyEmailForm({ handleSetState, enteredEmail }) {
    const [utilState, setUtilState] = useState({
        verificationCode: null,
        error: null,
    })
    const [timeLeft, setTimeLeft] = useState(60);
    const [progress, setProgress] = useState(100);
    const { fetchDataWith2Params: sendVerificationCode } = useEmail("send-verification-code")

    useEffect(() => {
        if (timeLeft === 60) {
            setUtilState(prevState => ({ ...prevState, verificationCode: generateRandomNumbers() }))
        }
    }, [timeLeft])

    useEffect(() => {
        if (utilState.verificationCode !== null) {
            send()
            // console.log(verificateCode);
        }
    }, [utilState.verificationCode])

    const send = async () => {
        const { data } = await sendVerificationCode(enteredEmail, utilState.verificationCode)
    }

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
            <div className='flex mt-2'>
                {timeLeft === 0
                    && <p className='text-xs text-blue-600 underline'
                        onClick={() => {
                            setUtilState(prevState => ({ ...prevState, verificationCode: generateRandomNumbers() }))
                            setTimeLeft(60)
                        }}>
                        Didn't receive verification code? Click here to resend.
                    </p>}
                {timeLeft > 0
                    && <ProgressBarComponent progress={progress}
                        handleSetProgress={setProgress} timeLeft={timeLeft}
                        handleSetTimeLeft={setTimeLeft} label="seconds to resend." />}
            </div>
        </form>
    )
}

export default VerifyEmailForm
