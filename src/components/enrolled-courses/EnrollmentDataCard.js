import React from 'react'

function EnrollmentDataCard({ course, courseName, ...props }) {
    return (
        <div className='basis-full px-3  mx-5 
                            shadow-lg shadow-stone-600 rounded-xl 
                            flex flex-row gap-2'>

            <div className='w-4/12 bg-cyan-400 rounded-lg mt-2 mb-2'>
            </div>

            <div className='w-full  rounded-lg mt-2 mb-2 
                                flex flex-col gap-3'>
                <div className='basis-full'>
                    <p className='text-stone-900 font-bold '>{course}</p>
                    <p className='text-gray-400 text-sm font-semibold italic '>{courseName}</p>
                </div>

                <div className='basis-full flex justify-end'>
                    <button className='bg-nykBlue px-2 py-1 rounded-lg text-slate-50 text-sm' {...props} >View</button>
                </div>

            </div>

        </div>
    )
}

export default EnrollmentDataCard
