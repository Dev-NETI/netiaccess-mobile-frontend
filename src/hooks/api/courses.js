'use client'

import { useResource } from '../resource'

/**
 * Use the Courses service.
 *
 * @return {*}
 */
const useCourses = () => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
  const route = '/api/courses'

  return {
    ...useResource({ baseURL, route }),
  }
}

export { useCourses }
