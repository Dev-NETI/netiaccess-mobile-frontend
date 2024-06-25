import React from 'react'
import Label from '@/components/Label'

function ProcessCardProcessIndicator({ processDescription, processNumber, isActive = false }) {
    const labelClass = isActive ? ' text-blue-700 font-extrabold ' : ' font-medium  text-gray-700 ';
    const badgeClass = isActive ? ' border-blue-700 text-stone-200 bg-blue-700 font-extrabold ' : ' border-neutral-500 text-neutral-500 ';


    return (
        <div className="basis-2/12">
            <Label className={`${labelClass} text-xs text-center `} >
                <span className={`${badgeClass} border-2  text-xs 
                                font-medium me-2 px-2 py-0.5 rounded-2xl 
                                dark:bg-blue-900 dark:text-blue-300`}>
                    {processNumber}
                </span>
                <p className="text-center mt-2 neutral-500">
                    {processDescription}
                </p>
            </Label>
        </div>
    )
}

export default ProcessCardProcessIndicator
