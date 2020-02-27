const ACTIONS = {
    UNSAVE_RECIPE: 'UNSAVE_RECIPE',
    SAVE_RECIPE: "SAVE_RECIPE",
};

function reducer(state = [], action) {
    switch (action.type) {
        case ACTIONS.UNSAVE_RECIPE:
            state = state.filter(URL => {
                return URL !== action.URL
            });
            return state;
        case ACTIONS.SAVE_RECIPE:
            state = state.slice();
            state.push(action.URL);
            return state;
        default:
            return state
    }
}

export {reducer, ACTIONS}
