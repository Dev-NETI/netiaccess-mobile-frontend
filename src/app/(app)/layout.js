'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import BottomNavigation from '@/components/app/BottomNavigation'

const AppLayout = ({ children, header }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            <main>{children}</main>
            <BottomNavigation />
        </div>
    )
}

export default AppLayout
