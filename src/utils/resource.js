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

export {
    showResource,
    showResourceW2Param,
    indexResource
}