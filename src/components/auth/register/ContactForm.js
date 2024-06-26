import React, { useEffect, useState } from 'react'
import InputGroup from '@/components/form-components/InputGroup'
import SelectGroup from '@/components/form-components/SelectGroup';
import SelectOption from '@/components/form-components/SelectOption';
import { useContext } from 'react';
import { RegisterContext } from '@/stores/RegisterContext';
import { useTrainee } from '@/hooks/api/trainee';
import { useDialingCode } from '@/hooks/api/dialing-code';
import Button from '@/components/Button';
import { indexResourceSingleState } from '@/utils/resource';
import Loading from '@/components/Loading';

function ContactForm() {
    const { setTraineeData, handleNextProcess, Yup } = useContext(RegisterContext);
    const [dialingCodeData, setDialingCodeData] = useState(null);
    const [selectedDialingCode, setSelectedDialingCode] = useState(null);
    const [error, setError] = useState({
        emailError: false,
        mobileNumberError: false,
    });
    const [loading, setLoading] = useState(true)
    const { show: checkEmail } = useTrainee('check-email');
    const { fetchDataWith2Params: checkNumber } = useTrainee('check-mobile');
    const { index: getDialingCode } = useDialingCode();
    const rules = Yup.object().shape({
        email: Yup.string().email('Please provide a valid email').required('Email is required!'),
        dialingCode: Yup.string().required('Dialing Code is required!'),
        contactNumber: Yup.string().required('Contact Number is required!'),
    })

    useEffect(() => {
        const fetchData = async () => {
            await indexResourceSingleState(getDialingCode, setDialingCodeData)
            setLoading(false)
        }
        fetchData()
    }, []);

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

    let disabled = false;
    let buttonStyle = "  mt-2 w-4/12 align ";
    if (error.emailError !== false || error.mobileNumberError !== false) {
        disabled = true;
        buttonStyle += " bg-slate-500 ";
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            await rules.validate(data, ({ abortEarly: false }))
            if (!disabled) {
                setTraineeData((prevState) => {
                    return {
                        ...prevState,
                        ...data
                    }
                })
                handleNextProcess();
            }
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc
            }, {});
            setError(errors)
        }
    }

    let ui = loading
        ?
        <div className="w-full">
            <Loading label="Loading..." />
        </div>
        :
        <form onSubmit={handleSubmit}>
            <div className="w-full">
                <InputGroup id="email" name="email" label="Email" placeholder="Enter Email" isError={error.emailError || error.email}
                    errorMessage={error.emailError ? "Email is already registered, please use another email!" : (error.email ? error.email : '')} type="email"
                    onChange={(event) => checkContact(event.target.value)} />
            </div>
            <div className="w-full flex flex-row">
                <div className='basis-4/12'>
                    <SelectGroup id="dialingCode" name="dialingCode" label="Dialing Code"
                        onChange={(event) => setSelectedDialingCode(event.target.value)} isError={error.dialingCode} errorMessage={error.dialingCode} >
                        <SelectOption id="" label="Select" />
                        {dialingCodeData && dialingCodeData.map((data) => <SelectOption key={data.id} id={data.id} label={`${data.country_code} (+${data.dialing_code})`} />)}
                    </SelectGroup>
                </div>
                <div className='basis-8/12'>
                    <InputGroup id="contactNumber" name="contactNumber" label="Contact Number" placeholder="Enter Contact Number" type="number"
                        isError={error.mobileNumberError || error.contactNumber} onChange={(event) => checkMobile(event.target.value)}
                        errorMessage={error.mobileNumberError ? 'Mobile number already registered!' : (error.contactNumber ? error.contactNumber : '')} />
                </div>
            </div>
            <div className='w-full'>
                <Button className={buttonStyle} disabled={disabled}>Verify</Button>
            </div>
        </form>

    return ui
}

export default ContactForm
