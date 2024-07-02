'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/auth'
import AddressForm from '@/components/auth/register/AddressForm'
import { RegisterContext } from '@/stores/RegisterContext'
import * as Yup from 'yup'
import PasswordHeader from '@/components/profile/password/header'
import { useTrainee } from '@/hooks/api/trainee'
import Loading from '@/components/Loading'
import ResponseView from '@/components/profile/password/Response'
import Back from '@/components/Back'

function UpdateAddress() {
    const { user } = useAuth({ middleware: 'auth' })
    const [traineeData, setTraineeData] = useState(null);
    const [utilState, setUtilState] = useState({
        loading: true,
        updateResponse: null,
    })
    const [initialData, setInitialData] = useState({
        postalCode: user.postal,
        street: user.street,
        regCode: user.regCode,
        provCode: user.provCode,
        cityCode: user.citynumCode,
        brgyCode: user.brgyCode,
        address: user.address,
    });
    const { show: getAddress } = useTrainee('address');
    const { patch: updateAddress } = useTrainee('updateAddress');

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getAddress(user.traineeid);
            setInitialData(prevState => ({ ...prevState, ...data }))
            setUtilState(prevState => ({ ...prevState, loading: false }))
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (traineeData !== null) {
            const update = async () => {
                const { data } = await updateAddress(user.traineeid, traineeData);
                console.log(data)
                setUtilState(prevState => ({ ...prevState, updateResponse: true }))
            }
            update()
        }
    }, [traineeData])

    function handleNextProcess() { }

    let ui = utilState.loading
        ? <div className='basis-full bg-white rounded-t-3xl p-5'>
            <Loading />
        </div>
        : <>
            <div className='basis-full bg-white rounded-t-3xl p-5'>
                <PasswordHeader title="Address" label="You can update your address here." />
            </div>
            <div className='basis-full bg-white flex flex-col gap-4 px-9'>
                <AddressForm initialData={initialData} />
            </div>
            <div className='basis-full bg-white flex justify-center py-2'>
                <Back route="/profile" />
            </div>
            <div className='basis-full bg-white py-12'></div>
        </>

    let activeView = utilState.updateResponse !== null
        ? <div className='basis-full bg-white rounded-t-3xl p-5'>
            <ResponseView response={utilState.updateResponse} successLabel="Your address information has been updated successfully!"
                defaultRoute="/profile" defaultButtonLabel="Go to profile" />
        </div>
        : ui
    return (
        <RegisterContext.Provider value={{ setTraineeData, Yup, handleNextProcess }}>
            {activeView}
        </RegisterContext.Provider>
    )
}

export default UpdateAddress
