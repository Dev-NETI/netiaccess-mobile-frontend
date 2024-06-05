'use client'

import { useResource } from "../resource"

const useTransportation = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/transportation'

    return {
        ...useResource({ baseURL, route }),
    }
}

export {
    useTransportation
}