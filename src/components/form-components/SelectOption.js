import React from 'react'

function SelectOption({id,label}) {
  return (
    <option value={id}>
      {label}
    </option>
  )
}

export default SelectOption
