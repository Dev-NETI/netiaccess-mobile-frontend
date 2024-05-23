import React, { act } from 'react'

function ToggleSwitch({ activeOption = 1, firstOption, secondOption, handleToggle }) {
    const selectedClass = " text-blue-600 bg-stone-100 font-bold ";
    const unSelectedClass = " bg-gray-300 ";

    return (
        <div className="flex flex-row gap-2 rounded-full bg-gray-300">
            <div className={`${activeOption === 1 ? selectedClass : unSelectedClass} basis-6/12 rounded-full text-center py-2 my-1 ml-1`}
                onClick={() => handleToggle(1)}>
                {firstOption}
            </div>
            <div className={`${activeOption === 2 ? selectedClass : unSelectedClass} basis-6/12 rounded-full text-center py-2 my-1 mr-1`}
                onClick={() => handleToggle(2)}>
                {secondOption}
            </div>
        </div>
    )
}

export default ToggleSwitch
