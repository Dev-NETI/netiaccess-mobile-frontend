import React from 'react'
import Image from 'next/image'
import blankDp from '../../../public/assets/system/blankDp.jpg'
import { TraineeContext } from '@/stores/TraineeContext'
import { useContext } from 'react'

function ProfileImage() {
    const { traineeData } = useContext(TraineeContext)
    const traineeName = traineeData.f_name + " " + traineeData.m_name + " " + traineeData.l_name + " " + traineeData.suffix

    return (
        <>
            <div className='basis-full flex justify-center py-5'>
                <Image
                    src={blankDp}
                    alt="Picture of the author"
                    className='rounded-full shadow-md'
                    width={100}
                    height={100}
                />
            </div>
            <div className='basis-full flex flex-col justify-center'>
                <p className='font-bold font-sans text-lg mx-auto'>
                    {traineeName}
                </p>
            </div>
            <div className='basis-full flex flex-col justify-center'>
                <p className='font-sans text-lg text-stone-400 mx-auto'>
                    {traineeData.rank?.rank}
                </p>
            </div>
        </>
    )
}

export default ProfileImage
