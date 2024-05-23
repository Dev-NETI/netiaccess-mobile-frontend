import React from 'react'

function ProcessCard({children}) {
    return (
        <div className="block max-w-sm p-6 bg-white border mx-5
                border-gray-200 rounded-lg shadow 
                hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    {children}
        </div>
    )
}

export default ProcessCard
