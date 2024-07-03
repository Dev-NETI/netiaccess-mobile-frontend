import React, { useEffect, useState } from 'react'
import { RegisterContext } from '@/stores/RegisterContext'
import { useContext } from 'react'
import Input from '@/components/Input'
import H2 from '@/components/H2'
import Paragraph from '@/components/Paragraph'
import Button from '@/components/Button'
import Badge from '@/components/Badge'
import { generateRandomNumbers } from '@/utils/utils'
import { handleInputChange } from '@/utils/utils'

function VerifyContactForm({ buttonLabel = "Create Account" }) {
    const { setTraineeData, handleNextProcess } = useContext(RegisterContext)
    const [error, setError] = useState(false);
    const [verificateCode, setVerificationCode] = useState();

    useEffect(() => {
        setVerificationCode(generateRandomNumbers());
    }, [])
    console.log(verificateCode);



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
            <div className="w-full">
                <H2 value="Enter verification code" />
                <Paragraph value="A verification code has been sent to your email and mobile number." className=" text-sm text-red-400 " />
            </div>
            <div className="flex flex-row gap-2">
                <Input className="basis-2/12" id="input1" name="input1" type="number"
                    onKeyUp={handleInputChange} required autoFocus />
                <Input className="basis-2/12" id="input2" name="input2" type="number"
                    onKeyUp={handleInputChange} required />
                <Input className="basis-2/12" id="input3" name="input3" type="number"
                    onKeyUp={handleInputChange} required />
                <Input className="basis-2/12" id="input4" name="input4" type="number"
                    onKeyUp={handleInputChange} required />
                <Input className="basis-2/12" id="input5" name="input5" type="number"
                    onKeyUp={handleInputChange} required />
                <Input className="basis-2/12" id="input6" name="input6" type="number"
                    onKeyUp={handleInputChange} required />
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
