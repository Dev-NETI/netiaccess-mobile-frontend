'use client'
import { useResource } from "../resource"

const useUser = (customUrl = null) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    let customRoute;

    if (customUrl === null) {
        customRoute = '/api/user'
    } else {
        customRoute = '/api/user/' + customUrl
    }
    const route = customRoute

    return {
        ...useResource({ baseURL, route }),
    }
}

export {
    useUser,
}