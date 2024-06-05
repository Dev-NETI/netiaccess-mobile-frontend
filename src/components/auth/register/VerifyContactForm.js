import React, { useEffect, useState } from 'react'
import { RegisterContext } from '@/stores/RegisterContext'
import { useContext } from 'react'
import Input from '@/components/Input'
import H2 from '@/components/H2'
import Paragraph from '@/components/Paragraph'
import Button from '@/components/Button'
import Badge from '@/components/Badge'

function VerifyContactForm() {
    const { setTraineeData, handleNextProcess } = useContext(RegisterContext)
    const [error, setError] = useState(false);
    const [verificateCode, setVerificationCode] = useState();

    useEffect(() => {
        setVerificationCode(generateRandomNumbers());
    }, [])
    console.log(verificateCode);

    // Event handler to move focus to the next or previous input
    const handleInputChange = (e) => {
        const currentInputId = e.target.id;
        const currentInputIndex = parseInt(currentInputId.replace('input', ''));

        // Move focus to the next input if a number is entered
        if (e.target.value.length === 1) {
            const nextInputId = `input${currentInputIndex + 1}`;
            const nextInput = document.getElementById(nextInputId);
            if (nextInput) {
                nextInput.focus();
            }
        }

        // Move focus to the previous input if backspace is pressed and input is empty
        if (e.key === 'Backspace' && e.target.value.length === 0) {
            const prevInputId = `input${currentInputIndex - 1}`;
            const prevInput = document.getElementById(prevInputId);
            if (prevInput) {
                prevInput.focus();
            }
        }
    };

    const generateRandomNumbers = () => {
        let randomNumbersString = '';
        for (let i = 0; i < 6; i++) {
            randomNumbersString += Math.floor(Math.random() * 10); // Generates a random digit between 0 and 9
        }
        return randomNumbersString;
    };

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
                <Button className="mt-2 w-4/12 align" >Create Account</Button>
            </div>
        </form>
    )
}

export default VerifyContactForm
