import React from 'react'
import H2 from '../H2'

function InvoiceSummary({firstValue,secondValue}) {
    return (
        <div className="basis-full flex flex-row px-2">
            <H2 value={firstValue} className="basis-7/12 text-sm text-start" />
            <H2 value={secondValue} className="basis-5/12 text-sm text-end" />
        </div>
    )
}

export default InvoiceSummary
