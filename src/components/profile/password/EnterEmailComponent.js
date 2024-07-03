import React, { useState } from 'react'
import InputGroup from '@/components/form-components/InputGroup'
import Button from '@/components/Button'
import { useContext } from 'react'
import { ProfileContext } from '@/stores/ProfileContext'

function EnterEmailComponent() {
    const { Yup, user, setUtilsState } = useContext(ProfileContext)
    const [error, setError] = useState()
    const rules = Yup.object().shape({
        email: Yup.string().email('Please provide a valid email')
            .required('Email is required!')
            .oneOf([user.email], 'Please enter your registered email address!'),
    })

    async function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            await rules.validate(data, ({ abortEarly: false }))
            setUtilsState(prevState => ({ activeForm: 2 }))
        } catch (error) {
            const errors = error.inner.reduce((acc, curr) => {
                acc[curr.path] = curr.message;
                return acc;
            }, {})
            setError(errors)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className='basis-full bg-white p-5'>
                <InputGroup type="text" id="email" name="email" label="Email" placeholder="Enter Email"
                    isError={error && error.email} errorMessage={error && error.email} />
            </div>
            <div className='basis-full bg-white px-5'>
                <Button className="" >Verify</Button>
            </div>
        </form>
    )
}

export default EnterEmailComponent
