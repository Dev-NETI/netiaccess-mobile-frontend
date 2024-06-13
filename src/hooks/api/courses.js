'use client'

import { useResource } from '../resource'

/**
 * Use the Courses service.
 *
 * @return {*}
 */
const useCourses = (customUrl = null) => {
  const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL
  let customRoute;

  if (customUrl === null) {
    customRoute = '/api/courses'
  } else {
    customRoute = '/api/courses/' + customUrl
  }
  const route = customRoute

  return {
    ...useResource({ baseURL, route }),
  }
}

export { useCourses }
