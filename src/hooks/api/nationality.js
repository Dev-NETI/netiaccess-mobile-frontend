'use client'

import { useResource } from "../resource"

const useNationality = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/nationality'

    return {
        ...useResource({baseURL,route}),
    }
}

export {useNationality}