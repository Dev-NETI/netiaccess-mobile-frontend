'use client'

import Header from '@/app/(app)/Header'
import { useCourses } from '@/hooks/api/courses'
import { useEffect, useState } from 'react'
import CoursesList from '@/components/enrollment/CoursesList'
import Input from '@/components/Input'

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
    const [courses, setCourses] = useState([]);//for searching
    const [searchedCourse, setSearchedCourse] = useState([]);//state holding the searched
    const { index } = useCourses();

    useEffect(() => {
        setLoading(true);

        index()
            .then(({ data }) => {
                setCourses(data);
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

    }, []);

    const filterCourseData = (identifier, data, courseTypeId) => {
        setFilteredCourses((prevState) => {
            return {
                ...prevState,
                [identifier]: data.filter(course => course.coursetypeid === courseTypeId)
            }
        });
    }

    const onSearch = (value) => {
        setSearchedCourse(value.length === 0 ? [] : courses.filter(course => course.coursecode.toLowerCase().includes(value.toLowerCase())));
    }
    console.log(searchedCourse);
    // console.log(filteredCourses.otherCourses);
    
    const courseList = searchedCourse.length === 0 ?
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
        <CoursesList title="Result" data={searchedCourse} itemcount={true} />

    return (
        <>
            <Header title="Enrollment" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">

                        {
                            loading ?
                                (
                                    <p>Courses is loading...</p>

                                ) :
                                (
                                    <div className="flex flex-col gap-3">
                                        {/* search courses */}
                                        <div>
                                            <Input className="rounded-2xl py-2" placeholder="Search..." onChange={(event) => onSearch(event.target.value)} />
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