'use client'

import { useResource } from '../resource'

/**
 * Use the Courses service.
 *
 * @return {*}
 */
const useDialingCode = () => {
    const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
    const route = '/api/dialing-code'

    return {
        ...useResource({ baseURL, route }),
    }
}

export { useDialingCode }
