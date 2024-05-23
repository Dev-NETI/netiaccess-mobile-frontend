'use client'

import { useResource } from "../resource"

const useBrgy = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/brgy'

    return {
        ...useResource({ baseURL, route }),
    }
}

export { useBrgy }