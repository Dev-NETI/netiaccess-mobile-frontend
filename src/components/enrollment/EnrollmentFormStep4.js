import React from 'react'
import H2 from '../H2'
import { formStep3Title, formStep3Notice, mandatoryRequirements } from '@/data/enrollment'
import Button from '../Button'
import Link from 'next/link'

function EnrollmentFormStep4() {
    return (
        <>
            <H2 value="Requirements" className="basis-full " />
            <H2 value={formStep3Notice} className="basis-full text-sm text-justify text-red-600 italic font-semibold mx-5" />

            {
                mandatoryRequirements.map((requirements) => (
                    <H2 key={requirements} value={requirements} className=" text-justify text-sm/[18px] font-bold mx-5" />
                ))
            }

            <Link href="/enrolled-courses">
                <Button className={` mt-2 basis-full `} type="button" >Finish</Button>
            </Link>
        </>
    )
}

export default EnrollmentFormStep4
