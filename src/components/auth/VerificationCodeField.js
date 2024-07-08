import React from 'react'
import Input from '@/components/Input'

function VerificationCodeField({ handleInputChange }) {
    return (
        <>
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
        </>
    )
}

export default VerificationCodeField
