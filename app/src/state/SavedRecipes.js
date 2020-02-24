const ACTIONS = {
    UNSAVE_RECIPE: 'UNSAVE_RECIPE',
    SAVE_RECIPE: "SAVE_RECIPE",
}

function reducer(state = [], action) {
    state = state.slice()
    switch (action.type) {
        case ACTIONS.UNSAVE_RECIPE:
            state.filter(URL => {
                return URL !== action.URL
            })
            break
        case ACTIONS.SAVE_RECIPE:
            state.push(action.URL)
    }
    return state
}

export {reducer, ACTIONS}
