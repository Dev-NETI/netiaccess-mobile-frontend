'use client'

import { useResource } from "../resource"

const useEnrollment = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/enrollment'

    return {
        ...useResource({ baseURL, route }),
    }
}

export {
    useEnrollment
}