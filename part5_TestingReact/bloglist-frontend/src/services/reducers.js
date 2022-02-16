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
        case 'LIKE_BLOG': {
            const id = action.data
            let blog = state.filter(b => b.id === id)
            if (blog) {
                blog.likes += 1
                let newBlogList = state.filter(b => b.id !== id).concat(blog)
                return newBlogList
            }
            else {
                return state
            }
        }
        case 'REMOVE_BLOG': {
            const id = action.data
            return state.filter(b => b.id !== id)
        }
        default:
            return state
    }
};

