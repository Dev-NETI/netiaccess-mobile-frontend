'use client'

import Header from '@/app/(app)/Header'
import { useCourses } from '@/hooks/api/courses'
import { useEffect, useState } from 'react'
import CoursesList from '@/components/enrollment/CoursesList'
import Input from '@/components/Input'
import Loading from '@/components/Loading'
import { getNmcCourses, getMandatoryCourses, getNmcrCourses, getPjmccCourses, getUpgradingCourses, getOtherCourses } from '@/utils/enrollment'
import { useAuth } from '@/hooks/auth'
import { useUser } from '@/hooks/api/user'
import { showResourceSingleState } from '@/utils/resource'

const CourseListPage = () => {
    const [loading, setLoading] = useState(true);
    const [filteredCourses, setFilteredCourses] = useState({
        'mandatoryCourses': [],
        'nmcCourses': [],
        'nmcrCourses': [],
        'pjmccCourses': [],
        'upgradingCourses': [],
        'otherCourses': [],
        'searchedCourses': [],
    });
    const [courses, setCourses] = useState([]);//for searching
    const { index, show } = useCourses();
    const { user } = useAuth({ middleware: 'auth' })
    const { show: showUserInfo } = useUser('rank')
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        const fetchUserInfo = async () => {
            await showResourceSingleState(user.rank_id, showUserInfo, setUserInfo);
        }
        fetchUserInfo();
    }, []);
    // userInfo.ranklevelid
    useEffect(() => {
        if (userInfo) {
            const fetchCourses = async () => {
                await showAllCourse();
                setLoading(false)
            }
            fetchCourses();
        }
    }, [userInfo]);

    const showAllCourse = async (searchInput = null) => {
        if (searchInput !== null && searchInput !== '') {
            const { data } = await show(searchInput)
            setCourses(data)
        } else {
            const { data } = await index()
            setCourses(null);
            getMandatoryCourses(setFilteredCourses, 'mandatoryCourses', data, 1, userInfo?.ranklevelid)//setMandatory
            getNmcCourses(setFilteredCourses, 'nmcCourses', data, 3, userInfo?.ranklevelid, userInfo?.rankdepartmentid)//setNMC
            getNmcrCourses(setFilteredCourses, 'nmcrCourses', data, 4, userInfo?.ranklevelid, userInfo?.rankdepartmentid)//setNMCR
            getPjmccCourses(setFilteredCourses, 'pjmccCourses', data, 7, userInfo?.ranklevelid, userInfo?.rankdepartmentid)//setPJMCC
            getUpgradingCourses(setFilteredCourses, 'upgradingCourses', data, 2, userInfo?.ranklevelid, userInfo?.rankdepartmentid)//setUPGRADING
            getOtherCourses(setFilteredCourses, 'otherCourses', data, 8, userInfo?.ranklevelid, userInfo?.rankdepartmentid)//setOTHER
        }
    }

    const courseList = courses === null ?
        (
            <>
                <CoursesList title="Mandatory" data={filteredCourses.mandatoryCourses} />
                <CoursesList title={
                    userInfo.ranklevelid === 5 || userInfo.ranklevelid === 6
                        ? 'NMC'
                        : 'NMCR'
                }
                    data={
                        userInfo.ranklevelid === 5 || userInfo.ranklevelid === 6
                            ? filteredCourses.nmcCourses
                            : filteredCourses.nmcrCourses
                    } />
                <CoursesList title="PJMCC" data={filteredCourses.pjmccCourses} />
                <CoursesList title="Upgrading" data={filteredCourses.upgradingCourses} />
                <CoursesList title="Other Government" data={filteredCourses.otherCourses} />
            </>
        )
        :
        <CoursesList title="Result" data={courses} itemcount={true} />

    const ui = loading
        ? <div className='flex h-screen bg-white items-center justify-center rounded-t-3xl'>
            <Loading label="Courses data is loading..." />
        </div>
        : <>
            <div className='basis-full bg-white rounded-t-3xl py-2'>
                <Header title="Enrollment" className="ml-6 mt-6" />
            </div>
            <div className='basis-full bg-white px-5 py-3'>
                <div className="flex flex-col gap-3 mb-20">
                    {/* search courses */}
                    <div>
                        <Input className="shadow-lg shadow-gray-500" placeholder="Search..." onChange={(event) => showAllCourse(event.target.value)} />
                    </div>

                    {courseList}
                </div>
            </div>
        </>

    return ui
}

export default CourseListPage