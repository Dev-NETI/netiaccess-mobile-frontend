import React, { useEffect } from 'react'


function ProgressBarComponent({ progress, handleSetProgress, timeLeft, handleSetTimeLeft, label }) {

    useEffect(() => {
        if (timeLeft > 0) {
            const timerId = setTimeout(() => {
                handleSetTimeLeft(timeLeft - 1);
                handleSetProgress((timeLeft - 1) * (100 / 60));
            }, 1000);

            return () => clearTimeout(timerId);
        }
    }, [timeLeft]);

    return (
        <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progress}%` }}>{timeLeft} {label}</div>
        </div>
    )
}

export default ProgressBarComponent
