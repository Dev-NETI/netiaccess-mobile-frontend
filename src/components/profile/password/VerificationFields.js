import React, { useEffect, useState } from 'react'
import { handleInputChange } from '@/utils/utils'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { generateRandomNumbers } from '@/utils/utils'
import { ProfileContext } from '@/stores/ProfileContext'
import { useContext } from 'react'
import Badge from '@/components/Badge'
import ProgressBarComponent from '@/components/ProgressBarComponent'
import { useEmail } from '@/hooks/api/email'
import { useAuth } from '@/hooks/auth'
import { useRouter } from 'next/navigation'

function VerificationFields({ mode = 'update' }) {
    const [verificationCode, setVerificationCode] = useState(null)
    const [error, setError] = useState(false)
    const [timeLeft, setTimeLeft] = useState(60);
    const [progress, setProgress] = useState(100);
    const { setUtilsState } = useContext(ProfileContext)
    const { user } = useAuth({ middleware: 'auth' })
    const { fetchDataWith2Params: sendVerificationCode } = useEmail("send-verification-code")
    const router = useRouter()

    useEffect(() => {
        if (timeLeft === 60) {
            setVerificationCode(generateRandomNumbers());
        }
    }, [timeLeft])

    useEffect(() => {
        if (verificationCode !== null) {
            send()
            // console.log(verificateCode);
        }
    }, [verificationCode])

    const send = async () => {
        const { data } = await sendVerificationCode(user.email, verificationCode)
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries())
        const enteredVerificationCode = data.input1 + data.input2 + data.input3 + data.input4 + data.input5 + data.input6

        const isError = enteredVerificationCode !== verificationCode
        setError(isError)

        if (!isError) {
            mode === 'update' && setUtilsState(prevState => ({ ...prevState, activeForm: 3 }))
            mode === 'verify-login' && router.push('/enrollment')
        }

    }

    return (
        <form onSubmit={handleSubmit}>

            <div className='basis-full bg-white flex flex-row gap-2 p-5'>
                <Input className="basis-2/12" id="input1" name="input1" type="number"
                    onKeyUp={handleInputChange} autoFocus />
                <Input className="basis-2/12" id="input2" name="input2" type="number"
                    onKeyUp={handleInputChange} />
                <Input className="basis-2/12" id="input3" name="input3" type="number"
                    onKeyUp={handleInputChange} />
                <Input className="basis-2/12" id="input4" name="input4" type="number"
                    onKeyUp={handleInputChange} />
                <Input className="basis-2/12" id="input5" name="input5" type="number"
                    onKeyUp={handleInputChange} />
                <Input className="basis-2/12" id="input6" name="input6" type="number"
                    onKeyUp={handleInputChange} />
            </div>
            {
                error
                && <div className='basis-full bg-white flex justify-start px-5'>
                    <Badge message="Verification code is wrong!" className="bg-red-400 text-red-800 font-semibold" />
                </div>
            }
            <div className='basis-full bg-white p-5'>
                <Button className="" >Verify</Button>
            </div>
            <div className='basis-full bg-white flex justify-center px-5'>
                {timeLeft === 0
                    && <p className='text-xs text-blue-600 underline'
                        onClick={() => {
                            setVerificationCode(generateRandomNumbers)
                            setTimeLeft(60)
                        }}>
                        Didn't receive verification code? Click here to resend.
                    </p>}
                {timeLeft > 0
                    && <ProgressBarComponent progress={progress}
                        handleSetProgress={setProgress} timeLeft={timeLeft}
                        handleSetTimeLeft={setTimeLeft} label="seconds to resend." />}
            </div>

        </form >
    )
}

export default VerificationFields
