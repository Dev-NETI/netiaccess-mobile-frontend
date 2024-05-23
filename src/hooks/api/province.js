'use client'

import { useResource } from "../resource"

const useProvince = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/state'

    return {
        ...useResource({ baseURL, route }),
    }
}

export { useProvince }