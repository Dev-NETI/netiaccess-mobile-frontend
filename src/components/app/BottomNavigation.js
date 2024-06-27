import React, { useState } from 'react'
import './BottomNavigation.css'
import BottomNavigationItem from './BottomNavigationItem'

function BottomNavigation() {
    const [selected, setSelected] = useState();

    const setSelectedItem = (item) => {
        setSelected(item);
    }

    return (
        <div className="fixed bottom-4 left-14 right-14 bg-blue-700 z-50 h-16  rounded-full shadow-blue-950 shadow-2xl
        dark:bg-gray-700 dark:border-gray-600">
            <div className="grid h-full max-w-lg grid-cols-3 mx-auto font-medium">
                <BottomNavigationItem isActive={selected === 'enrollment'} to="/enrollment" className='rounded-l-full'
                    label="Enrollment" onClick={() => setSelectedItem('enrollment')}
                    icon="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                <BottomNavigationItem isActive={selected === 'training'} to="/enrolled-courses" label="My Courses" onClick={() => setSelectedItem('training')}
                    icon="M11.074 4 8.442.408A.95.95 0 0 0 7.014.254L2.926 4h8.148ZM9 13v-1a4 4 0 0 1 4-4h6V6a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1v-2h-6a4 4 0 0 1-4-4Z" />
                <BottomNavigationItem isActive={selected === 'profile'} to="/profile" label="Profile" className='rounded-r-full'
                    onClick={() => setSelectedItem('profile')}
                    icon="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </div>
        </div>
    )
}

export default BottomNavigation
