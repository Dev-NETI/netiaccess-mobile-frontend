function indexResource(hookMethod, setMethod, identifier, finalMethod = null) {

    return hookMethod()
        .then(({ data }) => {

            setMethod((prevState) => {
                return {
                    ...prevState,
                    [identifier]: data
                }
            })

        })
        .finally(() => {
            if (finalMethod !== null) {
                finalMethod()
            }
        })
}

function showResource(hookMethod, parameter, setMethod, identifier, finalMethod = null) {

    return hookMethod(parameter)
        .then(({ data }) => {

            setMethod((prevState) => {
                return {
                    ...prevState,
                    [identifier]: data
                }
            })

        })
        .finally(() => {
            if (finalMethod !== null) {
                finalMethod()
            }
        })
}

function showResourceW2Param(hookMethod, parameter, secondParameter, setMethod, identifier, finalMethod = null) {

    return hookMethod(parameter, secondParameter)
        .then(({ data }) => {

            setMethod((prevState) => {
                return {
                    ...prevState,
                    [identifier]: data
                }
            })

        })
        .finally(() => {
            if (finalMethod !== null) {
                finalMethod()
            }
        })
}

async function updateResource(id, payload, resourceHookMethod) {
    const { data } = await resourceHookMethod(id, payload)
    return data
}

export {
    showResource,
    showResourceW2Param,
    indexResource,
    updateResource,
}