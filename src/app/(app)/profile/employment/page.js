'use client'
import React, { useEffect, useState } from 'react'
import PasswordHeader from '@/components/profile/password/header'
import EmploymentForm from '@/components/auth/register/EmploymentForm'
import { RegisterContext } from '@/stores/RegisterContext'
import * as Yup from 'yup'
import Back from '@/components/Back'
import { useAuth } from '@/hooks/auth'
import { useTrainee } from '@/hooks/api/trainee'
import Loading from '@/components/Loading'
import ResponseView from '@/components/profile/password/Response'

function UpdateEmployment() {
    const [traineeData, setTraineeData] = useState(null);
    const { user } = useAuth({ middleware: 'auth' })
    const [initialData, setInitialData] = useState({
        rankId: user.rank_id,
        companyId: user.company_id,
    })
    const [utilsState, setUtilsState] = useState({
        loading: true,
        updateResponse: null,
    })
    const { show: getEmployment } = useTrainee("employment-info")
    const { patch: updateEmployment } = useTrainee("updateEmployment")

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getEmployment(user.traineeid)
            setInitialData(prevState => ({ ...prevState, ...data }))
            setUtilsState(prevState => ({ ...prevState, loading: false }))
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (traineeData !== null) {
            const update = async () => {
                const { data } = await updateEmployment(user.traineeid, traineeData)
                setUtilsState(prevState => ({ ...prevState, updateResponse: data }))
            }
            update()
        }
    }, [traineeData])

    const handleNextProcess = () => { }

    let ui = utilsState.loading
        ? <div className='basis-full rounded-t-3xl bg-white p-5'>
            <Loading />
        </div>
        : <>
            <div className='basis-full rounded-t-3xl bg-white p-5'>
                <PasswordHeader title="Employment Info" label="You can update your rank and company here." />
            </div>
            <div className='basis-full bg-white px-9'>
                <EmploymentForm initialData={initialData} />
            </div>
            <div className='basis-full bg-white flex justify-center py-2'>
                <Back route="/profile" />
            </div>
        </>
    let activeView = utilsState.updateResponse !== null
        ? <div className='basis-full rounded-t-3xl bg-white p-5'>
            <ResponseView response={utilsState.updateResponse} successLabel="Employment information updated successfully!"
                defaultRoute="/profile" defaultButtonLabel="Go to profile" />
        </div>
        : ui
    return (
        <RegisterContext.Provider value={{ Yup, setTraineeData, handleNextProcess }}>
            {activeView}
        </RegisterContext.Provider>
    )
}

export default UpdateEmployment
