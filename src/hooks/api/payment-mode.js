'use client'

import { useResource } from "../resource"

const usePaymentMode = (secondParam = null) => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    let customRoute;

    if (secondParam === null) {
        customRoute = '/api/payment-mode'
    } else {
        customRoute = '/api/payment-mode/' + secondParam
    }
    const route = customRoute

    return {
        ...useResource({ baseURL, route }),
    }
}

export {
    usePaymentMode
}