import React, { useEffect, useState } from 'react'
import { RegisterContext } from '@/stores/RegisterContext'
import { useContext } from 'react'
import H2 from '@/components/H2'
import Paragraph from '@/components/Paragraph'
import Button from '@/components/Button'
import Badge from '@/components/Badge'
import { generateRandomNumbers } from '@/utils/utils'
import { handleInputChange } from '@/utils/utils'
import ProgressBarComponent from '@/components/ProgressBarComponent'
import VerificationCodeField from '../VerificationCodeField'
import { useEmail } from '@/hooks/api/email'

function VerifyContactForm({ buttonLabel = "Create Account" }) {
    const { traineeData, setTraineeData, handleNextProcess } = useContext(RegisterContext)
    const [error, setError] = useState(false);
    const [verificateCode, setVerificationCode] = useState(null);
    const [timeLeft, setTimeLeft] = useState(60);
    const [progress, setProgress] = useState(100);
    const { fetchDataWith2Params: sendVerificationCode } = useEmail("send-verification-code")

    useEffect(() => {
        if (timeLeft === 60) {
            setVerificationCode(generateRandomNumbers());
        }
    }, [timeLeft])

    useEffect(() => {
        if (verificateCode !== null) {
            send()
            // console.log(verificateCode);
        }
    }, [verificateCode])

    const send = async () => {
        const { data } = await sendVerificationCode(traineeData.email, verificateCode)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const enteredVerificationCode = data['input1'] + data['input2'] + data['input3'] + data['input4'] + data['input5'] + data['input6'];
        const isError = enteredVerificationCode !== verificateCode
        setError(isError)

        if (!isError) {
            setTraineeData((prevState) => ({ ...prevState }));
            handleNextProcess();
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full  py-5">
                <H2 value="Enter verification code" />
                <Paragraph value="A verification code has been sent to your email and mobile number." className=" text-sm text-red-400 " />
            </div>
            <div className="flex flex-row gap-2">
                <VerificationCodeField handleInputChange={handleInputChange} />
            </div>
            <div className='w-full mt-4 flex justify-end'>
                {timeLeft === 0 && <p className='text-blue-700 text-xs' onClick={() => setTimeLeft(60)}>Didn't receive code? Click here to resend</p>}
                {timeLeft > 0 && <ProgressBarComponent progress={progress} handleSetProgress={setProgress} timeLeft={timeLeft}
                    handleSetTimeLeft={setTimeLeft} label="seconds to resend." />}
            </div>
            <div className='w-full mt-4'>
                {error && <Badge className="basis-full  text-stone-200 text-xl bg-red-700" message="Verification code invalid!" />}
            </div>
            <div className='w-full'>
                <Button className="mt-2 w-4/12 align" >{buttonLabel}</Button>
            </div>
        </form>
    )
}

export default VerifyContactForm
