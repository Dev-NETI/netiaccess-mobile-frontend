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
import Loading from '../Loading'
import { generateUniqueRegistrationNumber } from '@/utils/utils'
import Back from '../Back'

function EnrollmentFormStep1() {
    const [isChecked, setIsChecked] = useState(false)
    const { course, handleNextForm, formatDate, user, setFormData, state } = useContext(EnrollmentContext)
    const [formOptions, setFormOptions] = useState({
        schedule: [],
        paymentMode: [],
        transportation: [],
        dormitory: [],
        selectedSchedule: [],
    });
    const [loading, setLoading] = useState(false)
    const { show } = useSchedule()
    const { fetchDataWith2Params: getPaymentMode } = usePaymentMode()
    const { index: getTransportation } = useTransportation()
    const { show: getDormitory } = useDormitory()
    const traineeId = user.traineeid
    const fleetId = user.fleet_id
    const traineeName = user.f_name + " " + user.l_name
    const registrationNumber = generateUniqueRegistrationNumber()

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true)
            await showResource(show, course, setFormOptions, "schedule")
            await showResourceW2Param(getPaymentMode, course, user.fleet_id, setFormOptions, "paymentMode")
            await indexResource(getTransportation, setFormOptions, "transportation")
            await showResource(getDormitory, user.fleet_id, setFormOptions, "dormitory")
            setLoading(false)
        }

        fetchData()

    }, [])

    const handleChecked = () => {
        setIsChecked(!isChecked);
    }

    function handleSubmit(event) {
        event.preventDefault()

        const fD = new FormData(event.target)
        const data = Object.fromEntries(fD.entries())

        setFormData((prevState) => {
            return {
                ...prevState,
                ...data,
                isChecked,
                course,
                traineeId,
                fleetId,
                traineeName,
                registrationNumber
            }
        })

        handleNextForm()
    }

    function handleScheduleChange(scheduleId) {
        setFormOptions((prevState) => {
            return {
                ...prevState,
                selectedSchedule: formOptions.schedule.find((item) => item.scheduleid === parseInt(scheduleId))
            }
        })

    }

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
                    <InputGroup type="date" id="checkInDate" name="checkInDate" min={formOptions.selectedSchedule.startdateformat}
                        defaultValue={formOptions.selectedSchedule.startdateformat} label="Check-in Date" errorMessage="Please select check in date!"
                        required={isChecked} />
                </div>
                <div className='basis-4/12'>
                    <InputGroup type="date" id="checkOutDate" name="checkOutDate" max={formOptions.selectedSchedule.enddateformat}
                        defaultValue={formOptions.selectedSchedule.enddateformat} label="Check-in Date" errorMessage="Please select check in date!"
                        required={isChecked} />
                </div>
            </div>
        </>
    )

    return (
        <>
            {
                loading ?
                    (
                        <div className='basis-full flex justify-center'>
                            <Loading label="Loading form data..." />
                        </div>
                    )
                    :
                    (
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

                            {
                                state.courseInfo.modeofdeliveryid !== 1 && (
                                    <div className="basis-full mt-2 flex items-center">
                                        <Checkbox label="Tick the box if you want to avail a dormitory/room." onChange={handleChecked} checked={isChecked} />
                                    </div>
                                )
                            }


                            {roomForm}

                            <div className='basis-full mt-2'>
                                <Button className="mt-2 "  >Next</Button>
                            </div>

                        </form>
                    )
            }
            <div className='basis-full justify-center flex'>
                <Back route="/enrollment" />
            </div>
        </>
    )
}

export default EnrollmentFormStep1
