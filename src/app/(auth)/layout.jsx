import React from 'react'
import AppLogo from '@/components/app/AppLogo'

function layout({ children }) {
    return (
        <div className="flex flex-col h-screen w-screen bg-nykBlue">
            <div className="basis-4/12  flex justify-center items-center py-4">
                <div className="bg-white rounded-full flex justify-center items-center">
                    <AppLogo />
                </div>
            </div>

            <div className="basis-full bg-slate-50 rounded-t-3xl">
                {children}
            </div>
        </div>
    )
}

export default layout
