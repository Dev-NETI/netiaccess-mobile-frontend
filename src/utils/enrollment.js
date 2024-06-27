const getNmcCourses = (setMethod, identifier, data, courseTypeId, rankLevelId, rankDepartmentId) => {
    setMethod((prevState) => {
        return {
            ...prevState,
            [identifier]: data.filter(course =>
                course.coursetypeid === courseTypeId && course.deletedid === 0 &&
                (
                    (rankLevelId === 5 || rankLevelId === 6)
                        ? (course.ranklevelid === 10 || course.ranklevelid === 9 || course.ranklevelid === rankLevelId && course.coursedepartmentid === rankDepartmentId)
                        : (course.ranklevelid === 10 || course.ranklevelid === rankLevelId && course.coursedepartmentid === rankDepartmentId)
                )
            )
        };
    });
};

const getMandatoryCourses = (setMethod, identifier, data, courseTypeId, rankLevelId) => {
    setMethod((prevState) => {
        return {
            ...prevState,
            [identifier]: data.filter(course =>
                course.coursetypeid === courseTypeId && course.deletedid === 0 &&
                (course.ranklevelid === 10 || course.ranklevelid === 9 || course.ranklevelid === rankLevelId)
            )
        };
    });
};

const getNmcrCourses = (setMethod, identifier, data, courseTypeId, rankLevelId, rankDepartmentId) => {
    setMethod((prevState) => {
        return {
            ...prevState,
            [identifier]: data.filter(course =>
                course.coursetypeid === courseTypeId && course.deletedid === 0 &&
                (course.coursedepartmentid === rankDepartmentId || course.coursedepartmentid === 4 || course.ranklevelid === rankLevelId)
            )
        };
    });
};

const getPjmccCourses = (setMethod, identifier, data, courseTypeId, rankLevelId, rankDepartmentId) => {
    setMethod((prevState) => {
        return {
            ...prevState,
            [identifier]: data.filter(course =>
                course.coursetypeid === courseTypeId && course.deletedid === 0 &&
                (course.coursedepartmentid === rankDepartmentId || course.coursedepartmentid === 4 || course.ranklevelid === rankLevelId)
            )
        };
    });
};

const getUpgradingCourses = (setMethod, identifier, data, courseTypeId, rankLevelId, rankDepartmentId) => {
    setMethod((prevState) => {
        return {
            ...prevState,
            [identifier]: data.filter(course =>
                course.coursetypeid === courseTypeId && course.deletedid === 0 &&
                course.courseid !== 117 && course.courseid !== 118 &&
                (course.coursedepartmentid === rankDepartmentId || course.coursedepartmentid === 4 || course.ranklevelid === rankLevelId || course.ranklevelid === 10)
            )
        };
    });
};

const getOtherCourses = (setMethod, identifier, data, courseTypeId, rankLevelId, rankDepartmentId) => {
    setMethod((prevState) => {
        return {
            ...prevState,
            [identifier]: data.filter(course =>
                course.coursetypeid === courseTypeId && course.deletedid === 0 &&
                (course.coursedepartmentid === rankDepartmentId || course.coursedepartmentid === 4 || course.ranklevelid === rankLevelId || course.ranklevelid === 10)
            )
        };
    });
};

export {
    getNmcCourses,
    getMandatoryCourses,
    getNmcrCourses,
    getPjmccCourses,
    getUpgradingCourses,
    getOtherCourses
}