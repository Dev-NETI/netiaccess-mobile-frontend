import React from 'react'
import Image from 'next/image'
import blankDp from '../../../public/assets/system/blankDp.jpg'
import { TraineeContext } from '@/stores/TraineeContext'
import { useContext } from 'react'

function ProfileImage() {
    const { user } = useContext(TraineeContext)
    const traineeName = user.f_name + " " + user.m_name + " " + user.l_name + " " + user.suffix

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
        </>
    )
}

export default ProfileImage
