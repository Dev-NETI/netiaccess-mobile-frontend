'use client'

import { useResource } from "../resource"

const useEnrollment = (customUrl = null) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    let customRoute;

    if (customUrl === null) {
        customRoute = '/api/enrollment'
    } else {
        customRoute = '/api/enrollment/' + customUrl
    }
    const route = customRoute
    
    return {
        ...useResource({ baseURL, route }),
    }
}

export {
    useEnrollment
}