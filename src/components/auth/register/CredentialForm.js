import React, { useState } from 'react';
import InputGroup from '@/components/form-components/InputGroup';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import Button from '@/components/Button';
import { useTrainee } from "@/hooks/api/trainee";
import Toast from '@/components/Toast';
import Link from 'next/link';

function CredentialForm() {
    const { traineeData, setTraineeData } = useContext(RegisterContext);
    const [passwordState, setPasswordState] = useState(null);
    const [error, setError] = useState({
        passwordError: false,
        confirmPasswordError: false,
    });
    const [httpResponse, setHttpResponse] = useState(null);
    const { store: storeTrainee } = useTrainee('store');

    function handleChange(value, setMethod) {
        setMethod(value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        const isConfirmPasswordError = passwordState !== data['confirmPassword'];
        setError((prevState) => ({
            ...prevState,
            confirmPasswordError: isConfirmPasswordError
        }));

        if (!isConfirmPasswordError) {
            setTraineeData((prevState) => {
                return {
                    ...prevState,
                    ...data
                };
            });

            // will uncomment this after finishing API
            storeTrainee(traineeData)
                .then(({ data }) => {
                    setHttpResponse(data);
                })
                .finally();
        }
    }

    let requestMessage = httpResponse ? 'Account created successfully!' : 'Creating account failed!';
    const toastComponent = httpResponse !== null && (<Toast message={requestMessage} response={httpResponse} />);

    return (
        <>
            {toastComponent}
            {
                httpResponse !== true
                    ?
                    (
                        <form onSubmit={handleSubmit}>
                            <div className="w-full">
                                <InputGroup id="password" name="password" label="Password" placeholder="Enter Password" type="password"
                                    onChange={(event) => handleChange(event.target.value, setPasswordState)} errorMessage="This is a test error message!" required />
                            </div>
                            <div className="w-full">
                                <InputGroup id="confirmPassword" name="confirmPassword" label="Re-enter Password" isError={error.confirmPasswordError} type="password"
                                    placeholder="Re-enter Password" errorMessage="Passwords do not match!" required />
                            </div>
                            <div className='w-full'>
                                <Button className="mt-2 w-4/12 align" >Create Account</Button>
                            </div>
                        </form>
                    )
                    :
                    (
                        <div className='w-full'>
                            <Link href="/login">
                                <Button className="mt-2 w-4/12 align" >Back to login</Button>
                            </Link>
                        </div>
                    )
            }
        </>
    );
}

export default CredentialForm;
