import React from 'react'
import Label from '../Label'
import Input from '../Input'
import Badge from '../Badge'

function InputGroup({ label, errorMessage, isError = false, type = "text", ...props }) {
    let style = isError && ' border-2 border-red-400 '
    return (
        <>

            <Label className=" font-medium  text-gray-700 ">{label}</Label>
            <Input type={type} className={`${style} py-0 mt-3`} {...props} />
            {isError && <Badge className="  text-red-500 text-xl bg-red-200  " message={errorMessage} />}

        </>
    )
}

export default InputGroup
