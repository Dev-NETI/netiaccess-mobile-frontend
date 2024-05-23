'use client'

import { useResource } from "../resource"

const useTrainee = (customUrl = null) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    let customRoute;

    if (customUrl === null) {
        customRoute = '/api/trainee'
    } else {
        customRoute = '/api/trainee/' + customUrl
    }
    const route = customRoute

    return {
        ...useResource({ baseURL, route }),
    }
}

export { useTrainee }