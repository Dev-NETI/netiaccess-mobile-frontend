'use client'

import { useResource } from "../resource"

const useEmail = (customUrl = null) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    let customRoute;

    if (customUrl === null) {
        customRoute = '/api/email'
    } else {
        customRoute = '/api/email/' + customUrl
    }
    const route = customRoute

    return {
        ...useResource({ baseURL, route }),
    }
}

export {
    useEmail
}