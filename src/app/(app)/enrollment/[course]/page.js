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
import { useEnrollment } from '@/hooks/api/enrollment'
import { showResourceW2Param, showResource } from '@/utils/resource'
import Modal from '@/components/Modal'
import Link from 'next/link'
import { useCourses } from '@/hooks/api/courses'

function EnrollmentForm({ params }) {
    const [activeForm, setActiveForm] = useState(1);
    const [state, setState] = useState({
        isEnroled: false,
        courseInfo: null,
    });
    const course = params.course
    const { user } = useAuth({ middleware: 'auth' })
    const [formData, setFormData] = useState({})
    const { fetchDataWith2Params: checkEnrollment } = useEnrollment('check')
    const { show: getCourseInfo } = useCourses('selected')

    useEffect(() => {
        const fetchData = async () => {
            await showResourceW2Param(checkEnrollment, course, user.traineeid, setState, 'isEnroled')
            await showResource(getCourseInfo, course, setState, 'courseInfo')
        }
        fetchData()
    }, [])

    function handleNextForm() {
        setActiveForm(activeForm + 1);
    }

    function handleSetMethod(identifier, newState, setMethod) {
        setMethod((prevState) => {
            return {
                ...prevState,
                [identifier]: newState
            }
        })
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

    const modalButton = <Link href="/enrollment">
        <button type="button" className='float-end px-3 py-1 text-sm 
                                            rounded-lg bg-cyan-500 text-stone-200 font-semibold'>Ok</button>
    </Link>

    const ui = state.isEnroled === true
        ? <div className='basis-full bg-white rounded-t-3xl py-2'>
            <Modal title="Warning" buttonSlot={modalButton} open={state.isEnroled}>
                You already have existing enrollment for this course!
            </Modal>
        </div>
        : <>
            <div className='basis-full bg-white rounded-t-3xl py-2'>
                {state.courseInfo && <H2 value={`Enrollment for ${state.courseInfo.coursecode}`} className="ml-3 mt-6" />}
            </div>

            <div className='basis-full flex flex-col bg-white px-10 pb-28 gap-4'>

                <div className='basis-full grid grid-cols-4 gap-2 mt-4'>
                    <FormIndicator active={activeForm === 1} />
                    <FormIndicator active={activeForm === 2} />
                    <FormIndicator active={activeForm === 3} />
                    <FormIndicator active={activeForm === 4} />


                </div>

                {enrollmentForm}

            </div>
        </>

    return (
        <EnrollmentContext.Provider value={{ course, handleNextForm, handleReturnForm, formatDate, user, formData, setFormData, state, setState, handleSetMethod }} >
            {ui}
        </EnrollmentContext.Provider>
    )
}

export default EnrollmentForm
