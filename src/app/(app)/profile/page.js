'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { useTrainee } from '@/hooks/api/trainee'
import { TraineeContext } from '@/stores/TraineeContext'
import ProfileImage from '@/components/profile/ProfileImage'
import Loading from '@/components/Loading'
import ProfileInformation from '@/components/profile/ProfileInformation'

function Profile() {
    const { user } = useAuth({ middleware: 'auth' })
    const [traineeData, setTraineeData] = useState([])
    const [loading, setLoading] = useState(true);
    const { show } = useTrainee()

    useEffect(() => {
        const fetchData = async () => {
            await show(user.traineeid)
                .then(({ data }) => {
                    setTraineeData(data)
                })
            setLoading(false);
        }
        fetchData()

    }, [show, user.traineeid])

    const UI = loading ?
        <div className='basis-full flex justify-center py-5'>
            <Loading label="Loading..." />
        </div>
        :
        <>
            <ProfileImage />
            <ProfileInformation />
        </>

    return (
        <TraineeContext.Provider value={{ traineeData }}>
            <div className='flex flex-col gap-2 mx-4 my-4 
        bg-white rounded-2xl shadow-lg'>
                {UI}
            </div>
        </TraineeContext.Provider>
    )
}

export default Profile
