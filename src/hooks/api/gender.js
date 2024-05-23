'use client'

import { useResource } from "../resource"

const useGender = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/gender'

    return {
        ...useResource({ baseURL, route }),
    }
}

export { useGender }