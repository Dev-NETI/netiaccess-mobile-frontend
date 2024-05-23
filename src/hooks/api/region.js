'use client'

import { useResource } from '../resource'

/**
 * Use the Courses service.
 *
 * @return {*}
 */
const useRegion = () => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
  const route = '/api/region'

  return {
    ...useResource({ baseURL, route }),
  }
}

export { useRegion }
