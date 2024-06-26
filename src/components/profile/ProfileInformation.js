import React from 'react'
import InformationLinkItem from './InformationLinkItem'

function ProfileInformation() {
    return (
        <div className='basis-full bg-blue-700 py-8 px-5 mt-2 rounded-2xl'>
            <p className='font-bold text-2xl text-stone-200'>
                My Information
            </p>

            <div className='flex flex-col gap-2 mt-9 mx-8'>
                <InformationLinkItem href={`/profile/personal-information`} label="Personal Information" />
                <InformationLinkItem href={`/profile/address`} label="Address" />
                <InformationLinkItem href="/dashboard" label="Employment Information" />
                <InformationLinkItem href={`/profile/contact`} label="Contact Information" />
                <InformationLinkItem href={`/profile/password`} label="Password" />
            </div>

        </div>
    )
}

export default ProfileInformation
