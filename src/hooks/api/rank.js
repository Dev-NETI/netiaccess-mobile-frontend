"use client"

import { useResource } from "../resource"

const useRank = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/rank'

    return {
        ...useResource({ baseURL, route }),
    }
}

export { useRank }