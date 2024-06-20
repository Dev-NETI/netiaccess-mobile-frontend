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

    const headerLabel = "Your current email is " + user.email + " and mobile number is " + user.contact_num + ". Please provide a new unique email or mobile number."
    let activeForm;
    switch (activeFormNumber) {
        case 1:
            activeForm = <>
                <PasswordHeader title="Update Contact Information" label={headerLabel} />
                <div className='px-5'>
                    <ContactForm />
                </div>
            </>
            break;
        case 2:
            activeForm = <div className='px-5'><VerifyContactForm buttonLabel="Update Contact" /></div >
            break;
        default:
            activeForm = <ResponseView response={response} successLabel={response.successLabel}
                defaultRoute="/profile" errorLabel={response.errorLabel}
                defaultButtonLabel="Go to profile" />
            break;
    }
    return (
        <RegisterContext.Provider value={{ traineeData, setTraineeData, handleNextProcess }}>
            <div className='flex flex-col gap-4 bg-gray-50 mx-10 my-10 py-4
                border-0 rounded-xl shadow-xl'>
                {activeForm}
                <div className='basis-full px-5 flex justify-center'>
                    <Back route="/profile" />
                </div>
            </div>
        </RegisterContext.Provider>
    )
}

export default Contact
