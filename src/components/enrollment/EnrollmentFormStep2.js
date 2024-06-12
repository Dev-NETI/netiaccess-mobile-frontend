import React, { useState } from 'react'
import H2 from '../H2'
import { title, reminder, acknowledgeLabel } from '@/data/enrollment'
import Paragraph from '../Paragraph'
import { EnrollmentContext } from '@/stores/EnrollmentContext'
import { useContext } from 'react'
import Button from '../Button'
import Checkbox from '../form-components/Checkbox'
import Return from './Return'
import { useEnrollment } from '@/hooks/api/enrollment'

function EnrollmentFormStep2() {
    const [isChecked, setIsChecked] = useState(false);
    const { handleNextForm, handleReturnForm, formData } = useContext(EnrollmentContext)
    const { store: storeEnrollment } = useEnrollment()
    console.log(formData)
    function handleChecked() {
        setIsChecked(!isChecked)
    }

    function handleNext() {

        storeEnrollment(formData)
            .then(({ data }) => {
                if (data) {
                    handleNextForm()
                }
            })

    }

    const buttonClass = !isChecked && 'bg-slate-500'
    return (
        <>
            <H2 value={title} className="basis-full " />

            {
                reminder.map((data) => (
                    <Paragraph value={data} className="basis-full px-2 text-justify " key={data} />
                ))
            }

            <div className='basis-full'>
                <Checkbox label={acknowledgeLabel} onChange={handleChecked} checked={isChecked} />
            </div>

            <Button className={`${buttonClass} mt-2 basis-full `} type="button" onClick={handleNext} disabled={!isChecked}>Next</Button>

            <Return onClick={handleReturnForm} />
        </>
    )
}

export default EnrollmentFormStep2
