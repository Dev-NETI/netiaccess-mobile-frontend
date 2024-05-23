import React, { useEffect, useState } from 'react'
import InputGroup from '@/components/form-components/InputGroup';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import Button from '@/components/Button';

function CredentialForm() {
    const { setTraineeData } = useContext(RegisterContext);
    const [passwordState, setPasswordState] = useState();
    const [error, setError] = useState({
        emailError: false,
        mobileNumberError: false,
        passwordError: false,
        confirmPasswordError: false,
    });
    
    

    function handleChange(value, setMethod) {
        setMethod(value)
    }

    function checkPassword(value) {
        let matchError;
        if (passwordState !== value) {
            matchError = true;
        } else {
            matchError = false;
        }
        setError((prevState) => {
            return {
                ...prevState,
                confirmPasswordError: matchError
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-full">
                <InputGroup id="" name="" label="Password" placeholder="Enter Password" type="password"
                    onChange={(event) => handleChange(event.target.value, setPasswordState)} errorMessage="This is a test error message!" required />
            </div>
            <div className="w-full">
                <InputGroup id="" name="" label="Re-enter Password" isError={error.confirmPasswordError} type="password"
                    onChange={(event) => checkPassword(event.target.value)} placeholder="Re-enter Password" errorMessage="Passwords do not match!" required />
            </div>
            <div className='w-full'>
                <Button className="mt-2 w-4/12 align" >Create Account</Button>
            </div>
        </form>
    )
}

export default CredentialForm
