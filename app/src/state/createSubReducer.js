export default function createSubReducer(reducer, sub_store_name, actions) {
    const modifiedActions = {}
    for (const [key, action] of Object.entries(actions)) {
        modifiedActions[key] = sub_store_name + ':' + action
    }


    return {actions: modifiedActions, reducer, sub_store_name}
}
