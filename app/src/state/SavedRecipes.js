import createSubReducer from "./createSubReducer";

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

const subReducer = createSubReducer(reducer, 'saved_recipes', {
    UNSAVE_RECIPE: 'UNSAVE',
    SAVE_RECIPE: "SAVE",
})

const ACTIONS = subReducer.actions

export default subReducer
