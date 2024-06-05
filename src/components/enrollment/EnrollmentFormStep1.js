'use client'
import React, { useEffect, useState } from 'react'
import SelectGroup from '@/components/form-components/SelectGroup'
import Checkbox from '../form-components/Checkbox'
import InputGroup from '../form-components/InputGroup'
import Button from '@/components/Button'
import { useContext } from 'react'
import { EnrollmentContext } from '@/stores/EnrollmentContext'
import { useSchedule } from '@/hooks/api/schedule'
import { usePaymentMode } from '@/hooks/api/payment-mode'
import { useTransportation } from '@/hooks/api/transportation'
import { useDormitory } from '@/hooks/api/dormitory'
import { showResource, showResourceW2Param, indexResource } from '@/utils/resource'

function EnrollmentFormStep1() {
    const [isChecked, setIsChecked] = useState(false)
    const { course, handleNextForm, formatDate, user, formData, setFormData } = useContext(EnrollmentContext)
    const [formOptions, setFormOptions] = useState({
        schedule: [],
        paymentMode: [],
        transportation: [],
        dormitory: [],
        selectedSchedule: [],
    });
    const { show } = useSchedule()
    const { fetchDataWith2Params: getPaymentMode } = usePaymentMode()
    const { index: getTransportation } = useTransportation()
    const { show: getDormitory } = useDormitory()

    useEffect(() => {
        showResource(show, course, setFormOptions, "schedule")
        showResourceW2Param(getPaymentMode, course, user.fleet_id, setFormOptions, "paymentMode")
        indexResource(getTransportation, setFormOptions, "transportation")
        showResource(getDormitory, user.fleet_id, setFormOptions, "dormitory")
    }, [])

    const handleChecked = () => {
        setIsChecked(!isChecked);
    }

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData.entries())

        setFormData((prevState) => {
            return {
                ...prevState,
                ...data
            }
        })

        handleNextForm()
    }

    //tp be continued
    function handleScheduleChange(scheduleId) {
        // const scheduleItem = formOptions.schedule.map(item => console.log(item));
    }
    // console.log(formOptions.schedule[1].scheduleid)

    const roomForm = isChecked && (
        <>
            <div className='basis-full mt-2'>
                <SelectGroup label="Room" id="dormId" name="dormId" errorMessage="Please select a room!" >
                    {
                        formOptions.dormitory.map((dormitory) => (
                            <option key={dormitory.dormid} value={dormitory.dormid}>{dormitory.dorm}</option>
                        ))
                    }
                </SelectGroup>
            </div>

            <div className='basis-full mt-2 flex flex-row gap-2 justify-between'>
                <div className='basis-4/12'>
                    <InputGroup type="date" id="checkInDate" name="checkInDate" label="Check-in Date" errorMessage="Please select check in date!" required={isChecked} />
                </div>
                <div className='basis-4/12'>
                    <InputGroup type="date" id="checkOutDate" name="checkOutDate" label="Check-in Date" errorMessage="Please select check in date!" required={isChecked} />
                </div>
            </div>
        </>
    )

    return (
        <form onSubmit={handleSubmit}>
            <div className='basis-full mt-2'>
                <SelectGroup label="Schedule" id="scheduleId" name="scheduleId" errorMessage="Please select a schedule!"
                    onChange={(event) => handleScheduleChange(event.target.value)} required>
                    <option value="">Select</option>
                    {
                        formOptions.schedule.map((schedule) => (
                            <option key={schedule.scheduleid} value={schedule.scheduleid}>{formatDate(schedule.startdateformat)} to {formatDate(schedule.enddateformat)}</option>
                        ))
                    }
                </SelectGroup>
            </div>

            <div className='basis-full mt-2'>
                <SelectGroup label="Payment Mode" id="paymentModeId" name="paymentModeId" errorMessage="Please select a payment mode!" required>
                    <option value="">Select</option>
                    {
                        formOptions.paymentMode.map((paymentMode) => (
                            <option key={paymentMode.paymentmodeid} value={paymentMode.paymentmodeid}>{paymentMode.paymentmode}</option>
                        ))
                    }
                </SelectGroup>
            </div>

            <div className='basis-full mt-2'>
                <SelectGroup label="Transportation" id="busModeId" name="busModeId" errorMessage="Please select a transportation!" required>
                    {
                        formOptions.transportation.map((transportation) => (
                            <option key={transportation.id} value={transportation.id} >{transportation.busmode}</option>
                        ))
                    }
                </SelectGroup>
            </div>

            <div className="basis-full mt-2 flex items-center">
                <Checkbox label="Tick the box if you want to avail a dormitory/room." onChange={handleChecked} checked={isChecked} />
            </div>

            {roomForm}

            <div className='basis-full mt-2'>
                <Button className="mt-2 "  >Next</Button>
            </div>

        </form>
    )
}

export default EnrollmentFormStep1
