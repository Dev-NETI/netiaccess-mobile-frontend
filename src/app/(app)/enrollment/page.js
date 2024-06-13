'use client'

import Header from '@/app/(app)/Header'
import { useCourses } from '@/hooks/api/courses'
import { useEffect, useState } from 'react'
import CoursesList from '@/components/enrollment/CoursesList'
import Input from '@/components/Input'
import { useAuth } from '@/hooks/auth'
import Loading from '@/components/Loading'

const CourseListPage = () => {
    const [loading, setLoading] = useState(false);
    const [filteredCourses, setFilteredCourses] = useState({
        'mandatoryCourses': [],
        'nmcCourses': [],
        'nmcrCourses': [],
        'pjmccCourses': [],
        'upgradingCourses': [],
        'otherCourses': [],
    });
    const [courses, setCourses] = useState(null);//for searching
    const { index, show } = useCourses();
    const { user } = useAuth({ middleware: 'auth' });

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            await showAllCourse(null);
            setLoading(false);
        }

        fetchData()

    }, []);

    const showAllCourse = (searchInput = null) => {
        if (searchInput !== null && searchInput !== '') {
            return show(searchInput)
                .then(({ data }) => {
                    setCourses(data)
                })
                .finally(() => setLoading(false))
        } else {
            return index()
                .then(({ data }) => {
                    setCourses(null);
                    //setMandatory
                    filterCourseData('mandatoryCourses', data, 1);
                    //setNMC
                    filterCourseData('nmcCourses', data, 3);
                    //setNMCR
                    filterCourseData('nmcrCourses', data, 4);
                    //setPJMCC
                    filterCourseData('pjmccCourses', data, 7);
                    //setUPGRADING
                    filterCourseData('upgradingCourses', data, 2);
                    //setOTHER
                    filterCourseData('otherCourses', data, 8);

                })
                .finally(() => setLoading(false))
        }
    }

    const filterCourseData = (identifier, data, courseTypeId) => {
        setFilteredCourses((prevState) => {
            return {
                ...prevState,
                [identifier]: data.filter(course => course.coursetypeid === courseTypeId)
            }
        });
    }

    const courseList = courses === null ?
        (
            <>
                <CoursesList title="Mandatory" data={filteredCourses.mandatoryCourses} />
                <CoursesList title="NMC" data={filteredCourses.nmcCourses} />
                <CoursesList title="NMCR" data={filteredCourses.nmcrCourses} />
                <CoursesList title="PJMCC" data={filteredCourses.pjmccCourses} />
                <CoursesList title="Upgrading" data={filteredCourses.upgradingCourses} />
                <CoursesList title="Other Government" data={filteredCourses.otherCourses} />
            </>
        )
        :
        <CoursesList title="Result" data={courses} itemcount={true} />

    return (
        <>
            <Header title="Enrollment" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">

                        {
                            loading ?
                                (
                                    <div className='flex justify-center'>
                                        <Loading label="Courses data is loading..." />
                                    </div>

                                ) :
                                (
                                    <div className="flex flex-col gap-3 mb-20">
                                        {/* search courses */}
                                        <div>
                                            <Input className="rounded-2xl py-2" placeholder="Search..." onChange={(event) => showAllCourse(event.target.value)} />
                                        </div>

                                        {courseList}
                                    </div>
                                )
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default CourseListPage