"use client"

import { useResource } from "../resource"

const useCompany = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/company'

    return {
        ...useResource({ baseURL, route }),
    }
}

export { useCompany }