import React from 'react'
import Label from '../Label'
import Input from '../Input'
import Badge from '../Badge'

function InputGroup({ label, errorMessage, isError = false, ...props }) {
    return (
        <>

            <Label className=" font-medium  text-gray-700 ">{label}</Label>
            <Input type="text" className=" py-0 mt-3" {...props} />
            {isError && <Badge className="  bg-red-100 text-red-800 " message={errorMessage} />}

        </>
    )
}

export default InputGroup
