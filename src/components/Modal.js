import React, { useEffect, useRef } from 'react'

function Modal({ title = null, children, buttonSlot, open, bottomDivider = true, ...props }) {
    const dialogRef = useRef(null);
    let dividerStyle = bottomDivider && 'border-b-2 border-stone-300'

    useEffect(() => {
        if (open) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [open])

    return (
        <dialog ref={dialogRef} className='bg-white shadow-lg shadow-stone-700 rounded-lg' {...props}>
            <div className="flex flex-col gap-2 w-80 ">
                <div className={`${dividerStyle} basis-full py-3 mx-4`}>
                    <h2 className='text-xl font-sans font-extrabold'>{title}</h2>
                </div>
                <div className={`${dividerStyle} basis-full py-3 mx-4`}>
                    {children}
                </div>
                <div className='basis-full py-3 mx-4'>
                    {buttonSlot}
                </div>
            </div>
        </dialog>
    )
}

export default Modal
