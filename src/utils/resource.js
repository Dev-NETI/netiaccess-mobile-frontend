//with Object inside state
//with Object inside state
async function indexResource(hookMethod, setMethod, identifier, finalMethod = null) {
    const { data } = await hookMethod();
    return setMethod((prevState) => {
        return {
            ...prevState,
            [identifier]: data
        }
    });
}

async function showResource(hookMethod, parameter, setMethod, identifier, finalMethod = null) {
    const { data } = await hookMethod(parameter);
    return setMethod((prevState) => {
        return {
            ...prevState,
            [identifier]: data
        }
    });
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
//with Object inside state end
//with Object inside state end


//with SINGLE STATE
//with SINGLE STATE
async function indexResourceSingleState(resourceHookMethod, setMethod) {
    const { data } = await resourceHookMethod();
    return setMethod(data);
}
async function updateResource(id, payload, resourceHookMethod) {
    const { data } = await resourceHookMethod(id, payload)
    return data
}
async function showResourceSingleState(id, resourceHookMethod, setMethod) {
    const { data } = await resourceHookMethod(id)
    return setMethod(data);
}
//with SINGLE STATE END
//with SINGLE STATE END

export {
    showResource,
    showResourceW2Param,
    indexResource,
    updateResource,
    indexResourceSingleState,
    showResourceSingleState,
}