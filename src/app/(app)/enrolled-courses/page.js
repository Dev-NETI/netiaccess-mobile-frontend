'use client'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Input from '@/components/Input'
import { useEnrollment } from '@/hooks/api/enrollment'
import { showResource } from '@/utils/resource'
import { useAuth } from '@/hooks/auth'
import EnrollmentDataCard from '@/components/enrolled-courses/EnrollmentDataCard'

function EnrolledCourses() {
    let title = "Enrolled Courses"
    const [data, setData] = useState({
        enrollmentData: [],
        searchedData: [],
    });
    const [loading, setLoading] = useState(false);
    const { show } = useEnrollment();
    const { user } = useAuth({ middleware: 'auth' })

    useEffect(() => {

        showResource(show, user.traineeid, setData, 'enrollmentData')

    }, [])

    function handleSearch(searchValue) {
        const filteredData = data.enrollmentData.filter((data) => data.course.coursecode.includes(searchValue))

        setData((prevState) => {
            return {
                ...prevState,
                searchedData: filteredData
            }
        })

    }

    const listData = data.searchedData.length > 0 ? data.searchedData : data.enrollmentData;

    return (
        <div className='flex flex-col gap-4 bg-white mx-5 mt-2 rounded-xl shadow-lg'>

            <div className='basis-full'>
                <Header title={title} />
            </div>

            <div className='basis-full mx-5'>
                <Input className=" rounded-2xl " placeholder="Search course..." onChange={(event) => handleSearch(event.target.value)} />
            </div>

            <div className='basis-full mb-5 flex flex-col gap-6'>
                {
                    listData.map((data) => {
                        const trainingDate = data.schedule.startdateformat + " to " + data.schedule.enddateformat;
                        return (
                            <EnrollmentDataCard key={data.enroledid} course={data.course.coursecode} trainingDate={trainingDate} />
                        )
                    })
                }
            </div>

        </div>
    )
}

export default EnrolledCourses
