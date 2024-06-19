import React from 'react'
import InformationLinkItem from './InformationLinkItem'
import { TraineeContext } from '@/stores/TraineeContext'
import { useContext } from 'react'

function ProfileInformation() {
    const { traineeData } = useContext(TraineeContext)
    return (
        <div className='basis-full bg-blue-700 py-8 px-5 mt-2 rounded-2xl'>
            <p className='font-bold text-2xl text-stone-200'>
                My Information
            </p>

            <div className='flex flex-col gap-2 mt-9 mx-8'>
                <InformationLinkItem href={`/profile/personal-information/${traineeData.traineeid}`} label="Personal Information" />
                <InformationLinkItem href={`/profile/address/${traineeData.traineeid}`} label="Address" />
                <InformationLinkItem href="/dashboard" label="Employment Information" />
                <InformationLinkItem href="/dashboard" label="Contact Information" />
                <InformationLinkItem href={`/profile/password/${traineeData.traineeid}`} label="Password" />
            </div>

        </div>
    )
}

export default ProfileInformation
