import React from 'react'

function Button({style,value,...props}) {
  return (
    <button 
    className={style + ' block w-full rounded-3xl px-3 py-3 text-center text-sm font-semibold shadow-sm'}
    {...props} >{value}</button>
  )
}

export default Button
