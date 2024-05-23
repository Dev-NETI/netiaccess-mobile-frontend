import React, { useState } from 'react'
import './BottomNavigation.css'
import BottomNavigationItem from './BottomNavigationItem'

function BottomNavigation() {
    const [selected,setSelected] = useState();

    const setSelectedItem = (item) => {
        setSelected(item);
    }

    return (
        <footer className="Footer bg-indigo-800">
            <nav>
                <div className='flex flex-row gap-6'>
                    <BottomNavigationItem isActive={selected === 'enrollment'} to="/enrollment" label="Enrollment" onClick={()=>setSelectedItem('enrollment')} />
                    <BottomNavigationItem isActive={selected === 'training'} to="/dashboard" label="Dashboard" onClick={()=>setSelectedItem('training')} />
                    <BottomNavigationItem isActive={selected === 'profile'} to="/dashboard" label="Dashboard" onClick={()=>setSelectedItem('profile')} />
                </div>
            </nav>
        </footer>
    )
}

export default BottomNavigation
