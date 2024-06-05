'use client'

import { useResource } from "../resource"

const useSchedule = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/schedule'

    return {
        ...useResource({ baseURL, route }),
    }
}

export { useSchedule }