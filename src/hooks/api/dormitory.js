'use client'

import { useResource } from "../resource"

const useDormitory = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/dormitory'

    return {
        ...useResource({ baseURL, route }),
    }
}

export {
    useDormitory
}