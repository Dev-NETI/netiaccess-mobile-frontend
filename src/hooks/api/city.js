'use client'

import { useResource } from "../resource"

const useCity = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/city'

    return {
        ...useResource({ baseURL, route }),
    }
}

export { useCity }