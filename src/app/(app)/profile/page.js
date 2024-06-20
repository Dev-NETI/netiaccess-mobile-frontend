'use client'

import React, { Suspense, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import { TraineeContext } from '@/stores/TraineeContext'
import ProfileImage from '@/components/profile/ProfileImage'
import ProfileInformation from '@/components/profile/ProfileInformation'

function Profile() {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <TraineeContext.Provider value={{ user }}>
            <div className='flex flex-col gap-2 mx-4 my-4 
        bg-white rounded-2xl shadow-lg'>
                <ProfileImage />
                <ProfileInformation />
            </div>
        </TraineeContext.Provider>
    )
}

export default Profile
