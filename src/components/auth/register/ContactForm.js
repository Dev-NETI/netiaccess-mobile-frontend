import React, { useEffect, useState } from 'react'
import InputGroup from '@/components/form-components/InputGroup'
import SelectGroup from '@/components/form-components/SelectGroup';
import SelectOption from '@/components/form-components/SelectOption';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import { useTrainee } from '@/hooks/api/trainee';
import { useDialingCode } from '@/hooks/api/dialing-code';
import Button from '@/components/Button';

function ContactForm() {
    const { setTraineeData, handleNextProcess } = useContext(RegisterContext);
    const [dialingCodeData, setDialingCodeData] = useState(null);
    const [selectedDialingCode, setSelectedDialingCode] = useState(null);
    const [error, setError] = useState({
        emailError: false,
        mobileNumberError: false,
    });
    const { show: checkEmail } = useTrainee('check-email');
    const { fetchDataWith2Params: checkNumber } = useTrainee('check-mobile');
    const { index: getDialingCode } = useDialingCode();

    useEffect(() => {

        getDialingCode()
            .then(({ data }) => {
                setDialingCodeData(data)
            })
            .finally()
    }, []);
    // if(selectedDialingCode !== null){
    //     console.log(selectedDialingCode)
    // }

    function checkContact(value) {
        checkEmail(value)
            .then(({ data }) => {
                setError((prevState) => {
                    return {
                        ...prevState,
                        emailError: data
                    }
                })
            })
            .finally()
    }

    function checkMobile(value) {
        checkNumber(selectedDialingCode, value)
            .then(({ data }) => {
                setError((prevState) => {
                    return {
                        ...prevState,
                        mobileNumberError: data
                    }
                })
            })
            .finally()
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full">
                <InputGroup id="email" name="email" label="Email" placeholder="Enter Email" isError={error.emailError}
                    errorMessage="Email is already registered, please use another email!"
                    onChange={(event) => checkContact(event.target.value)} required />
            </div>
            <div className="w-full flex flex-row">
                <div className='basis-4/12'>
                    <SelectGroup id="dialingCode" name="dialingCode" label="Dialing Code"
                        onChange={(event) => setSelectedDialingCode(event.target.value)} errorMessage="test error msg" required>
                        <SelectOption id="" label="Select" />
                        {dialingCodeData && dialingCodeData.map((data) => <SelectOption key={data.id} id={data.id} label={`${data.country_code} (+${data.dialing_code})`} />)}
                    </SelectGroup>
                </div>
                <div className='basis-8/12'>
                    <InputGroup id="contactNumber" name="contactNumber" label="Contact Number" placeholder="Enter Contact Number"
                        isError={error.mobileNumberError} onChange={(event) => checkMobile(event.target.value)} errorMessage="This is a test error message!" required />
                </div>
            </div>
            <div className='w-full'>
                <Button className="mt-2 w-4/12 align" >Verify</Button>
            </div>
        </form>
    )
}

export default ContactForm
