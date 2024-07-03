'use client'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Input from '@/components/Input'
import { useEnrollment } from '@/hooks/api/enrollment'
import { useAuth } from '@/hooks/auth'
import EnrollmentDataCard from '@/components/enrolled-courses/EnrollmentDataCard'
import SmallToggleSwitch from '@/components/SmallToggleSwitch'
import Loading from '@/components/Loading'
import EnrollmentInformationModal from '@/components/enrolled-courses/EnrollmentInformationModal'
import Button from '@/components/Button'

function EnrolledCourses() {
    const [data, setData] = useState({
        enrollmentData: [],
        searchedData: [],
        selectedData: null,
    });
    const [utilsState, setUtilsState] = useState({
        toggleButton: false,
        modal: false,
        loading: true,
        modalDataLoading: true,
    })
    const { show } = useEnrollment();
    const { show: showSelectedTraining } = useEnrollment('showSelectedCourse');
    const { user } = useAuth({ middleware: 'auth' })

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await show(user.traineeid)
            data && setData(prevState => ({ ...prevState, enrollmentData: data }))
            setUtilsState(prevState => ({ ...prevState, loading: false }))
        }
        fetchData()
    }, [])

    function handleSearch(searchValue) {
        const searchData = data.enrollmentData.filter((data) => data.course.coursecode.includes(searchValue))
        setData(prevState => ({ ...prevState, searchedData: searchValue.length > 0 ? searchData : [] }))
    }

    async function setSelectedTraining(enroledid) {
        setUtilsState(prevState => ({ ...prevState, modalDataLoading: true }))
        const { data } = await showSelectedTraining(enroledid);
        setData(prevState => ({ ...prevState, selectedData: data }))
        setUtilsState(prevState => ({ ...prevState, modalDataLoading: false }))
    }

    let filteredData
    let title
    if (data.enrollmentData.length > 0) {

        filteredData = utilsState.toggleButton
            ? data.enrollmentData.filter((data) => data.pendingid === 0)
            : data.enrollmentData.filter((data) => data.pendingid === 1)
        title = utilsState.toggleButton
            ? "Enrolled Courses"
            : "Pending Courses"

    }

    const modelCloseButton = <div className='flex justify-end'>
        <Button type="button" className="basis-3/12 bg-red-800"
            onClick={() => {
                setUtilsState(prevState => ({ ...prevState, modal: false }));
                setData(prevState => ({ ...prevState, selectedData: null }));
            }} >Close</Button>
    </div>
    const listData = data.searchedData.length > 0 ? data.searchedData : filteredData;
    const toggleLabel = utilsState.toggleButton ? 'Showing Enrolled Courses' : 'Showing Pending Courses';
    const UI = utilsState.loading ?
        (
            <div className='flex h-screen bg-white justify-center  py-2'>
                <Loading label="Loading courses..." />
            </div>
        ) :
        (
            <>
                <div className='basis-full bg-white rounded-t-3xl px-7 py-5'>
                    <Header title={title} />
                </div >

                <div className='basis-full bg-white px-7 py-2'>
                    <Input className=" rounded-2xl " placeholder="Search course..." onChange={(event) => handleSearch(event.target.value)} />
                </div>

                <div className='basis-full bg-white flex justify-start px-7 py-2'>
                    <SmallToggleSwitch label={toggleLabel}
                        onClick={() => setUtilsState(prevState => ({ ...prevState, toggleButton: !utilsState.toggleButton }))} />
                </div>

                <div className='basis-full bg-white flex flex-col gap-6 '>
                    {
                        listData !== undefined &&
                        listData.map((data) => {
                            return (
                                <EnrollmentDataCard key={data.enroledid} course={data.course.coursecode}
                                    onClick={() => {
                                        setUtilsState(prevState => ({ ...prevState, modal: true }));
                                        setSelectedTraining(data.enroledid)
                                    }}
                                    courseName={data.course.coursename} />
                            )
                        })
                    }
                </div>
                <EnrollmentInformationModal trainingInfo={data.selectedData} loading={utilsState.modalDataLoading}
                    open={utilsState.modal} buttonSlot={modelCloseButton} />
            </>
        )

    return UI
}

export default EnrolledCourses
