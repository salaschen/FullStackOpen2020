export const notifyReducer = (state = "", action) => {
    switch (action.type) {
        case "NOTIFICATION":
            return action.data;
        default:
            return state;
    }
};

// the reducer for the blogs
export const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS': {
            // console.log('init blogs') // debug
            return action.data
        }
        case 'NEW_BLOG': {
            return state.concat(action.data)
        }
        default:
            return state
    }
};

