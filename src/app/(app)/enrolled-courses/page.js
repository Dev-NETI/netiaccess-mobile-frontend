'use client'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Input from '@/components/Input'
import { useEnrollment } from '@/hooks/api/enrollment'
import { showResource } from '@/utils/resource'
import { useAuth } from '@/hooks/auth'
import EnrollmentDataCard from '@/components/enrolled-courses/EnrollmentDataCard'
import SmallToggleSwitch from '@/components/SmallToggleSwitch'
import Loading from '@/components/Loading'

function EnrolledCourses() {
    const [data, setData] = useState({
        enrollmentData: [],
        searchedData: [],
    });
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false);
    const { show } = useEnrollment();
    const { user } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        setLoading(true)
        showResource(show, user.traineeid, setData, 'enrollmentData')
        setLoading(false)
    }, [])

    function handleSearch(searchValue) {
        const searchData = data.enrollmentData.filter((data) => data.course.coursecode.includes(searchValue))

        setData((prevState) => {
            return {
                ...prevState,
                searchedData: searchValue.length > 0 ? searchData : []
            }
        })

    }

    let filteredData
    let title
    if (data.enrollmentData.length > 0) {

        filteredData = toggle ? data.enrollmentData.filter((data) => data.pendingid === 0) : data.enrollmentData.filter((data) => data.pendingid === 1)
        title = toggle ? "Enrolled Courses" : "Pending Courses"

    }

    const listData = data.searchedData.length > 0 ? data.searchedData : filteredData;
    const toggleLabel = toggle ? 'Showing Enrolled Courses' : 'Showing Pending Courses';
    const UI = loading ?
        (
            <div className='basis-3/12 flex justify-center  py-2'>
                <Loading label="Loading courses..." />
            </div>
        ) :
        (
            <>
                <div className='basis-full'>
                    <Header title={title} />
                </div >

                <div className='basis-full mx-5'>
                    <Input className=" rounded-2xl " placeholder="Search course..." onChange={(event) => handleSearch(event.target.value)} />
                </div>

                <div className='basis-full flex justify-start mx-5'>
                    <SmallToggleSwitch label={toggleLabel} onClick={() => setToggle(!toggle)} />
                </div>

                <div className='basis-full mb-20 flex flex-col gap-6'>
                    {
                        listData !== undefined &&
                        listData.map((data) => {
                            const trainingDate = data.schedule.startdateformat + " to " + data.schedule.enddateformat;
                            return (
                                <EnrollmentDataCard key={data.enroledid} course={data.course.coursecode} trainingDate={trainingDate} />
                            )
                        })
                    }
                </div>
            </>
        )

    return (
        <div className='flex flex-col gap-4 bg-white mx-5 mt-2 rounded-xl shadow-lg'>
            {UI}
        </div>
    )
}

export default EnrolledCourses
