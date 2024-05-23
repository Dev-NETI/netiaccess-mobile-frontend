'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus'
import H2 from '@/components/H2'
import Paragraph from '@/components/Paragraph'
import Anchor from '@/components/Anchor'

const Login = () => {
    const router = useRouter()
    const title = "Welcome Back!";
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/enrollment',
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [shouldRemember, setShouldRemember] = useState(false)
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    useEffect(() => {
        if (router.reset?.length > 0 && errors.length === 0) {
            setStatus(atob(router.reset))
        } else {
            setStatus(null)
        }
    })

    const submitForm = async event => {
        event.preventDefault()

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        })
    }

    return (
        <div className="grid grid-cols-1 ">
            <div className="col-span-1 mx-2 flex flex-col items-center">
                <div className="w-full text-start ml-2">
                    <H2 value={title} className=""></H2>
                    <Paragraph
                        styles="mt-4"
                        value="Sign in with your email and password."
                    ></Paragraph>
                </div>
            </div>


            <div className="col-span-1 mx-7">
                <form onSubmit={submitForm} >
                    <div className="flex flex-col gap-4 mt-4">
                        {/* Email Address */}
                        <div className="w-full ">
                            <Label htmlFor="email">Email</Label>

                            <Input
                                id="email"
                                type="email"
                                value={email}
                                className="block mt-1 w-full rounded-3xl"
                                onChange={event => setEmail(event.target.value)}
                                required
                                autoFocus
                            />

                            <InputError messages={errors.email} className="mt-2" />
                        </div>

                        {/* Password */}
                        <div className="mt-4">
                            <Label htmlFor="password">Password</Label>

                            <Input
                                id="password"
                                type="password"
                                value={password}
                                className="block mt-1 w-full rounded-3xl"
                                onChange={event => setPassword(event.target.value)}
                                required
                                autoComplete="current-password"
                            />

                            <InputError
                                messages={errors.password}
                                className="mt-2"
                            />
                        </div>

                        <div className="flex flex-col items-center justify-center gap-4 mt-4">
                            <Button className="ml-3 w-full rounded-3xl">Login</Button>

                            <Link
                                href="/forgot-password"
                                className="underline text-sm text-gray-600 hover:text-gray-900">
                                Forgot your password?
                            </Link>
                            
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Login
