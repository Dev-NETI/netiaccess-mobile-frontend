import React from 'react'
import H2 from '../H2'
import { formStep3Title } from '@/data/enrollment'
import InvoiceSummary from './InvoiceSummary'
import Divider from '../Divider'
import Button from '../Button'
import { EnrollmentContext } from '@/stores/EnrollmentContext'
import { useContext } from 'react'
import Return from './Return'

function EnrollmentFormStep3() {
    const { handleNextForm, handleReturnForm } = useContext(EnrollmentContext)
    return (
        <>
            <H2 value={formStep3Title} className="basis-full text-xl" />

            <H2 value="Summary" className="basis-full mx-auto" />

            <H2 value="Reference #: 102910291" className="basis-full text-sm" />

            <InvoiceSummary firstValue="Course" secondValue="NMC 06" />
            <InvoiceSummary firstValue="Training Date" secondValue="Jun. 03, 2024 - Jun. 05, 2024" />
            <InvoiceSummary firstValue="Package" secondValue="Package 3" />
            <InvoiceSummary firstValue="Package Price" secondValue="₱ 5,000.00" />
            <Divider />
            <InvoiceSummary firstValue="Room Type" secondValue="Single" />
            <InvoiceSummary firstValue="Check In Date" secondValue="Jun. 03, 2024" />
            <InvoiceSummary firstValue="Check Out Date" secondValue="Jun. 05, 2024" />
            <InvoiceSummary firstValue="Transportation" secondValue="Roundtrip" />
            <InvoiceSummary firstValue="Dormitory & Meal Fee" secondValue="₱ 2,000.00" />

            <Button className={` mt-2 basis-full `} type="button" onClick={handleNextForm} >Next</Button>
            <Return onClick={handleReturnForm} />
        </>
    )
}

export default EnrollmentFormStep3
