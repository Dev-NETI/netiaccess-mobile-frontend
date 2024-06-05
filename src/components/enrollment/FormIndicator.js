import React from 'react'

function FormIndicator({ active = false }) {
    const style = active ? 'bg-cyan-400 shadow-2xl shadow-cyan-600 ' : 'bg-slate-300'
    return (
        <div className={`${style} col-span-1 py-1 rounded-lg `}></div>
    )
}

export default FormIndicator
