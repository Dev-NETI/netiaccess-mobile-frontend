'use client'
import React, { useEffect, useState } from 'react'
import H2 from '@/components/H2'
import EnrollmentFormStep1 from '@/components/enrollment/EnrollmentFormStep1'
import EnrollmentFormStep2 from '@/components/enrollment/EnrollmentFormStep2'
import EnrollmentFormStep3 from '@/components/enrollment/EnrollmentFormStep3'
import EnrollmentFormStep4 from '@/components/enrollment/EnrollmentFormStep4'
import FormIndicator from '@/components/enrollment/FormIndicator'
import { EnrollmentContext } from '@/stores/EnrollmentContext'
import { formatDate } from '@/utils/utils'
import { useAuth } from '@/hooks/auth'

function EnrollmentForm({ params }) {
    const [activeForm, setActiveForm] = useState(1);
    const course = params.course
    const { user } = useAuth({ middleware: 'auth' })
    const [formData, setFormData] = useState({})

    useEffect(() => {
        // console.log(formData)
    }, [formData])

    function handleNextForm() {
        setActiveForm(activeForm + 1);
    }

    function handleReturnForm() {
        setActiveForm(activeForm - 1);
    }

    let enrollmentForm;
    switch (activeForm) {
        case 1:
            enrollmentForm = <EnrollmentFormStep1 />
            break;
        case 2:
            enrollmentForm = <EnrollmentFormStep2 />
            break;
        case 3:
            enrollmentForm = <EnrollmentFormStep3 />
            break;
        default:
            enrollmentForm = <EnrollmentFormStep4 />
            break;
    }

    return (
        <EnrollmentContext.Provider value={{ course, handleNextForm, handleReturnForm, formatDate, user, formData, setFormData }} >
            <H2 value="Enrollment for NMC 06" className=" ml-4 mt-4 " />
            <div className='flex flex-col gap-5 mt-4 mx-8 bg-slate-50 
            px-3 py-3 rounded-xl shadow-xl'>

                <div className='basis-full grid grid-cols-4 gap-2'>
                    <FormIndicator active={activeForm === 1} />
                    <FormIndicator active={activeForm === 2} />
                    <FormIndicator active={activeForm === 3} />
                    <FormIndicator active={activeForm === 4} />
                </div>

                {enrollmentForm}

            </div>
        </EnrollmentContext.Provider>
    )
}

export default EnrollmentForm
