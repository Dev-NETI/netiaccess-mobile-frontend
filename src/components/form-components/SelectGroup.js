import React from 'react'
import Label from '../Label'
import Badge from '../Badge'
import Select from '../Select'

function SelectGroup({ label, errorMessage, isError = false, children, ...props }) {
    return (
        <>
            <Label className=" font-medium  text-gray-700 ">{label}</Label>
            <Select className=" py-0 mt-3" {...props}>
                {children}
            </Select>
            {isError && <Badge className="  text-stone-200 text-xl bg-red-700 " message={errorMessage} />}

        </>

    )
}

export default SelectGroup