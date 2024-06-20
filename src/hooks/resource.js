import axios from "@/lib/axios";

/**
 * Create a new resource.
 *
 * @param {*} { baseURL, route }
 * @return {*}
 */
const useResource = ({ baseURL, route }) => {
    /**
     * Fetch all records from the resource.
     *
     * @return {*}
     */
    const index = () => axios.get(`${route}`)

    /**
     * Fetch a single record from the resource.
     *
     * @param {*} id
     * @return {*}
     */
    const show = (id) => axios.get(`${route}/${id}`)

    const fetchDataWith2Params = (param1, param2) => axios.get(`${route}/${param1}/${param2}`)


    /**
     * Store a new record in the resource.
     *
     * @param {*} payload
     * @return {*}
     */
    const store = (payload) => axios.post(`${route}`, payload)

    /**
     * Update a record in the resource.
     *
     * @param {*} id
     * @param {*} payload
     * @return {*}
     */
    const update = (id, payload) => axios.put(`${route}/${id}`, payload)

    const patch = (id, payload) => axios.patch(`${route}/${id}`, payload)

    /**
     * Delete a record from the resource.
     *
     * @param {*} id
     * @return {*}
     */
    const destroy = (id) => axios.delete(`${route}/${id}`)

    return {
        index,
        show,
        fetchDataWith2Params,
        store,
        update,
        destroy,
        patch
    }
}

export { useResource }
