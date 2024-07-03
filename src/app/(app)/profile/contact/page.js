'use client'
import React, { useState } from 'react'
import ContactForm from '@/components/auth/register/ContactForm'
import PasswordHeader from '@/components/profile/password/header'
import { RegisterContext } from '@/stores/RegisterContext'
import { useTrainee } from '@/hooks/api/trainee'
import { useAuth } from '@/hooks/auth'
import VerifyContactForm from '@/components/auth/register/VerifyContactForm'
import { updateResource } from '@/utils/resource'
import ResponseView from '@/components/profile/password/Response'
import Back from '@/components/Back'
import * as Yup from 'yup'

function Contact() {
    const [traineeData, setTraineeData] = useState(null);
    const [activeFormNumber, setActiveFormNumber] = useState(1)
    const [response, setResponse] = useState({
        successLabel: 'Contact information updated successfully',
        errorLabel: 'Something went wrong',
    })
    const { user } = useAuth({ middleware: 'auth' })
    const { show } = useTrainee()
    const { update: updateContact } = useTrainee('updateContact')

    function handleNextProcess() {
        if (activeFormNumber !== 1) {
            const updateResponse = updateResource(user.traineeid, traineeData, updateContact)
            setResponse((prevState) => {
                return {
                    ...prevState,
                    updateResponse
                }
            })
        }
        setActiveFormNumber(activeFormNumber + 1)
    }

    const headerLabel = "Your current email is " + user.email + ". Please provide a new unique email or mobile number."
    let activeForm;
    switch (activeFormNumber) {
        case 1:
            activeForm = <div className='basis-full rounded-t-lg bg-white'>
                <PasswordHeader title="Update Contact Information" label={headerLabel} />
                <div className='px-5'>
                    <ContactForm />
                </div>
            </div>
            break;
        case 2:
            activeForm = <div className='basis-full rounded-t-lg bg-white px-5'>
                <VerifyContactForm buttonLabel="Update Contact" />
            </div >
            break;
        default:
            activeForm = <div className='basis-full rounded-t-lg bg-white px-5'>
                <ResponseView response={response} successLabel={response.successLabel}
                    defaultRoute="/profile" errorLabel={response.errorLabel}
                    defaultButtonLabel="Go to profile" />
            </div >
            break;
    }
    return (
        <RegisterContext.Provider value={{ traineeData, setTraineeData, handleNextProcess, Yup }}>
            {activeForm}
            <div className='basis-full bg-white p-5 flex justify-center'>
                <Back route="/profile" />
            </div>
        </RegisterContext.Provider>
    )
}

export default Contact
