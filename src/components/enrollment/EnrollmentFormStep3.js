import React, { useEffect, useState } from 'react'
import H2 from '../H2'
import { formStep3Title } from '@/data/enrollment'
import InvoiceSummary from './InvoiceSummary'
import Divider from '../Divider'
import Button from '../Button'
import { EnrollmentContext } from '@/stores/EnrollmentContext'
import { useContext } from 'react'
import Return from './Return'
import { useEnrollment } from '@/hooks/api/enrollment'
import { showResource } from '@/utils/resource'
import Loading from '@/components/Loading'
import { formatDate } from '@/utils/utils'

function EnrollmentFormStep3() {
    const { handleNextForm, handleReturnForm, user, state } = useContext(EnrollmentContext)
    const [enrollmentData, setEnrollmentData] = useState({
        enrollmentData: [],
        loading: false,
    })
    const { show } = useEnrollment('getLatestEnrollment')

    useEffect(() => {

        const fetchData = async () => {
            handleSetMethod(setEnrollmentData, 'loading', true)
            await showResource(show, user.traineeid, setEnrollmentData, 'enrollmentData')
            handleSetMethod(setEnrollmentData, 'loading', false)
        }

        fetchData()

    }, [])
    
    function handleSetMethod(setMethod, identifier, newState) {
        setMethod((prevState) => {
            return {
                ...prevState,
                [identifier]: newState
            }
        })
    }

    function formatReservationDate(dateValue) {
        if (dateValue !== null) {
            return formatDate(dateValue)
        }
        return ''
    }

    let totalDormAndMeal
    if (enrollmentData.enrollmentData.length > 0) {
        totalDormAndMeal = (enrollmentData.enrollmentData.dorm_price === null ?? 0) + (enrollmentData.enrollmentData.meal_price === null ?? 0)
    }
    const trainingDate = formatDate(enrollmentData.enrollmentData.schedule?.startdateformat) + " to " + formatDate(enrollmentData.enrollmentData.schedule?.enddateformat)

    const UI = enrollmentData.loading ?
        (
            <div className='basis-full flex justify-center'>
                <Loading label="Loading Invoice..." />
            </div>
        )
        :
        (
            <>
                <H2 value={formStep3Title} className="basis-full text-xl" />

                <H2 value="Summary" className="basis-full mx-auto" />

                <H2 value={`Reference #: ${enrollmentData.enrollmentData.registrationcode}`} className="basis-full text-sm " />

                <InvoiceSummary firstValue="Course" secondValue={state.courseInfo.coursecode} />
                <InvoiceSummary firstValue="Training Date" secondValue={trainingDate} />
                <InvoiceSummary firstValue="Package" secondValue={`Package ${enrollmentData.enrollmentData.t_fee_package}`} />
                <InvoiceSummary firstValue="Package Price" secondValue="₱ 5,000.00" />
                <Divider />
                <InvoiceSummary firstValue="Room Type" secondValue={enrollmentData.enrollmentData.dorm?.dorm} />
                <InvoiceSummary firstValue="Check In Date" secondValue={formatReservationDate(enrollmentData.enrollmentData.checkindate)} />
                <InvoiceSummary firstValue="Check Out Date" secondValue={formatReservationDate(enrollmentData.enrollmentData.checkoutdate)} />
                <InvoiceSummary firstValue="Transportation" secondValue="Roundtrip" />
                <InvoiceSummary firstValue="Dormitory & Meal Fee" secondValue="0" />

                <Button className={` mt-2 basis-full `} type="button" onClick={handleNextForm} >Next</Button>

            </>
        )

    return (
        <>
            {UI}
        </>
    )
}

export default EnrollmentFormStep3
