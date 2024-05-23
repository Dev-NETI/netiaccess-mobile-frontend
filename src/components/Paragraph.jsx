import React from 'react'

function Paragraph({styles,value}) {
  return (
    <p className={styles + " text-lg text-stone-600"} >{value}</p>
  )
}

export default Paragraph
