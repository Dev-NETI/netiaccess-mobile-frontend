'use client'

import React from 'react'
import { useAuth } from '@/hooks/auth'
import { TraineeContext } from '@/stores/TraineeContext'
import ProfileImage from '@/components/profile/ProfileImage'
import ProfileInformation from '@/components/profile/ProfileInformation'

function Profile() {
    const { user } = useAuth({ middleware: 'auth' })

    return (
        <TraineeContext.Provider value={{ user }}>

            <ProfileImage />
            <ProfileInformation />

        </TraineeContext.Provider>
    )
}

export default Profile
