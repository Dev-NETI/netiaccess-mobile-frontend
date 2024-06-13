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
import Loading from '@/components/Loading'

function EnrollmentForm({ params }) {
    const [activeForm, setActiveForm] = useState(1);
    const [state, setState] = useState({
        isEnroled: false,
        loading: false,
        courseInfo: [],
    });
    const course = params.course
    const { user } = useAuth({ middleware: 'auth' })
    const [formData, setFormData] = useState({})
    const { fetchDataWith2Params: checkEnrollment } = useEnrollment('check')
    const { show: getCourseInfo } = useCourses('selected')

    useEffect(() => {
        // console.log(formData)

        const fetchData = async () => {
            handleSetMethod('loading', true, setState)
            await showResourceW2Param(checkEnrollment, course, user.traineeid, setState, 'isEnroled')
            await showResource(getCourseInfo, course, setState, 'courseInfo')
            handleSetMethod('loading', false, setState)
        }

        fetchData()
    }, [formData])

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

    const formUI = state.loading ?
        (
            <div className='flex flex-row'>
                <div className='basis-full justify-center flex mt-20'>
                    <Loading label="Loading form..." />
                </div>
            </div>
        )
        :
        (
            <EnrollmentContext.Provider value={{ course, handleNextForm, handleReturnForm, formatDate, user, formData, setFormData, state, setState, handleSetMethod }} >
                <H2 value={`Enrollment for ${state.courseInfo.coursecode}`} className=" ml-4 mt-4 " />
                <div className='flex flex-col gap-5 mt-4 mx-8 bg-slate-50 
            px-3 py-3 rounded-xl shadow-xl'>

                    <div className='basis-full grid grid-cols-4 gap-2'>
                        <FormIndicator active={activeForm === 1} />
                        <FormIndicator active={activeForm === 2} />
                        <FormIndicator active={activeForm === 3} />
                        <FormIndicator active={activeForm === 4} />

                        <Modal title="Warning" buttonSlot={modalButton} open={state.isEnroled}>
                            You already have existing enrollment for this course!
                        </Modal>
                    </div>

                    {enrollmentForm}

                </div>
            </EnrollmentContext.Provider>
        )

    return (
        <>
            {formUI}
        </>
    )
}

export default EnrollmentForm
