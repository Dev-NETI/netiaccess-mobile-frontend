import React from 'react'

function Paragraph({className,value}) {
  return (
    <p className={`${className} text-lg text-stone-600`} >{value}</p>
  )
}

export default Paragraph
