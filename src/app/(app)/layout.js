'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import BottomNavigation from '@/components/app/BottomNavigation'

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen ">
            <Navigation user={user} />

            <main className='flex flex-col w-screen bg-nykBlue '>{children}</main>
            <BottomNavigation />
        </div>
    )
}

export default AppLayout
