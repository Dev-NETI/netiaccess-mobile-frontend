import React from 'react'
import Modal from '@/components/Modal'
import Badge from '../Badge'
import { formatDate } from '@/utils/utils'
import Loading from '../Loading'

function EnrollmentInformationModal({ loading, trainingInfo = null, ...props }) {
    const trainingDate = trainingInfo && "Training Date: " + formatDate(trainingInfo.schedule?.startdateformat) + " to " + formatDate(trainingInfo.schedule?.enddateformat)
    let ui = loading
        ? <Loading />
        : <>
            <div className='basis-full bg-slate-50 rounded-lg shadow-lg shadow-slate-400 flex flex-col gap-2 justify-center items-center px-5 py-5'>
                <p className='block font-bold text-2xl'>
                    {trainingInfo && trainingInfo.course?.coursecode}
                </p>
                <p className='block font-semibold text-base'>
                    {trainingInfo && trainingInfo.course?.coursename}
                </p>
            </div>

            <div className='basis-full'>
                <Badge className="bg-blue-500 text-slate-50 font-semibold"
                    message={trainingDate} />
            </div>

            <div className='basis-full'>
                <Badge className="bg-blue-500 text-slate-50 font-semibold"
                    message={trainingInfo && trainingInfo?.course?.mode?.modeofdelivery} />
            </div>

            <div className='basis-full'>
                <Badge className="bg-blue-500 text-slate-50 font-semibold"
                    message={`Location: ${trainingInfo && trainingInfo?.course?.location?.courselocation}`} />
            </div>
        </>

    return (
        <Modal bottomDivider={false} {...props}>
            <div className='flex flex-col gap-4'>
                {ui}
            </div>
        </Modal>
    )
}

export default EnrollmentInformationModal
