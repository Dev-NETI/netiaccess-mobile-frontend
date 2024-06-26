import React from 'react'
import Label from '../Label'
import Badge from '../Badge'
import Select from '../Select'

function SelectGroup({ label, errorMessage, isError = false, children, ...props }) {
    let style = isError && ' border-2 border-red-400 '
    return (
        <>
            <Label className=" font-medium  text-gray-700 ">{label}</Label>
            <Select className={`${style} py-0 mt-3`} {...props}>
                {children}
            </Select>
            {isError && <Badge className="  text-red-500 text-xl bg-red-200 " message={errorMessage} />}

        </>

    )
}

export default SelectGroup
