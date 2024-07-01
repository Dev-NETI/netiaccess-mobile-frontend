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
import * as Yup from 'yup'

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
    const [loading, setLoading] = useState(true)
    const [validationError, setValidationError] = useState(true)
    const { show } = useSchedule()
    const { fetchDataWith2Params: getPaymentMode } = usePaymentMode()
    const { index: getTransportation } = useTransportation()
    const { show: getDormitory } = useDormitory()
    const traineeId = user.traineeid
    const fleetId = user.fleet_id
    const traineeName = user.f_name + " " + user.l_name
    const registrationNumber = generateUniqueRegistrationNumber()
    const rules = Yup.object().shape({
        scheduleId: Yup.string().required('Schedule is required!'),
        paymentModeId: Yup.string().required('Payment mode is required!'),
        busModeId: Yup.string().required('Bus mode is required!'),
        dormId: isChecked && Yup.string().required('Dormitory is required!'),
        checkInDate: isChecked && Yup.string().required('Check-in date is required!'),
        checkOutDate: isChecked && Yup.string().required('Check-out date is required!'),
    })

    useEffect(() => {

        const fetchData = async () => {
            await showResource(show, course, setFormOptions, "schedule")
            await showResourceW2Param(getPaymentMode, course, user.fleet_id, setFormOptions, "paymentMode")
            await indexResource(getTransportation, setFormOptions, "transportation")
            await showResource(getDormitory, user.fleet_id, setFormOptions, "dormitory")
            setLoading(false)
        }

        fetchData()
    }, [])

    async function handleSubmit(event) {
        event.preventDefault()

        const fD = new FormData(event.target)
        const data = Object.fromEntries(fD.entries())

        try {
            await rules.validate(data, { abortEarly: false })
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
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {});
            setValidationError(errors)
        }

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
                <SelectGroup label="Room" id="dormId" name="dormId"
                    isError={validationError.dormId} errorMessage={validationError.dormId} >
                    {
                        formOptions.dormitory.map((dormitory) => (
                            <option key={dormitory.dormid} value={dormitory.dormid}>{dormitory.dorm}</option>
                        ))
                    }
                </SelectGroup>
            </div>

            <div className='basis-full mt-2 flex flex-row  justify-between'>
                <div className='basis-6/12 w-4'>
                    <InputGroup type="date" id="checkInDate" name="checkInDate" min={formOptions.selectedSchedule.startdateformat}
                        defaultValue={formOptions.selectedSchedule.startdateformat} label="Check-in Date"
                        isError={validationError.checkInDate} errorMessage={validationError.checkInDate}
                    />
                </div>
                <div className='basis-6/12 w-4'>
                    <InputGroup type="date" id="checkOutDate" name="checkOutDate" max={formOptions.selectedSchedule.enddateformat}
                        defaultValue={formOptions.selectedSchedule.enddateformat} label="Check-in Date"
                        isError={validationError.checkOutDate} errorMessage={validationError.checkOutDate}
                    />
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
                                <SelectGroup label="Schedule" id="scheduleId" name="scheduleId"
                                    isError={validationError.scheduleId} errorMessage={validationError.scheduleId}
                                    onChange={(event) => handleScheduleChange(event.target.value)} >
                                    <option value="">Select</option>
                                    {
                                        formOptions.schedule.map((schedule) => (
                                            <option key={schedule.scheduleid} value={schedule.scheduleid}>{formatDate(schedule.startdateformat)} to {formatDate(schedule.enddateformat)}</option>
                                        ))
                                    }
                                </SelectGroup>
                            </div>

                            <div className='basis-full mt-2'>
                                <SelectGroup label="Payment Mode" id="paymentModeId" name="paymentModeId"
                                    isError={validationError.paymentModeId} errorMessage={validationError.paymentModeId} >
                                    <option value="">Select</option>
                                    {
                                        formOptions.paymentMode.map((paymentMode) => (
                                            <option key={paymentMode.paymentmodeid} value={paymentMode.paymentmodeid}>{paymentMode.paymentmode}</option>
                                        ))
                                    }
                                </SelectGroup>
                            </div>

                            <div className='basis-full mt-2'>
                                <SelectGroup label="Transportation" id="busModeId" name="busModeId"
                                    isError={validationError.busModeId} errorMessage={validationError.busModeId} >
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
                                        <Checkbox label="Tick the box if you want to avail a dormitory/room." onChange={() => setIsChecked(!isChecked)} checked={isChecked} />
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
