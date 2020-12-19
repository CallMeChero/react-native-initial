import CreateDataContext from './CreateDataContext';

const blogReducer = (state,action) => {
    switch (action.type) {
        case 'add_blogpost':
            return [...state, 
                {
                    id: Math.floor(Math.random() * 99999), 
                    title: action.payload.title,
                    content: action.payload.content
                }
            ];
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost
            })
        case 'delete_blogpost':
            return state.filter(item => item.id !== action.payload)
    }
};

const addBlogPost = (dispatch) => {
    return (title, content, callback) => {
        dispatch({
            type: 'add_blogpost',
            payload: {
                title: title,
                content: content
            }
        })
        if(callback) {
            callback();
        }
    }
};

const editBlogPost = (dispatch) => {
    return (id, title, content, callback) => {
        dispatch({
            type: 'edit_blogpost',
            payload: {
                id: id,
                title: title,
                content: content
            }
        })
        if(callback) {
            callback();
        }
    }
};

const deleteBlogPost = (dispatch) => {
    return (id) => {
        dispatch({ type: 'delete_blogpost', payload: id })
    }
};

export const { Context, Provider } = CreateDataContext(
    blogReducer, 
    { addBlogPost, deleteBlogPost, editBlogPost },
    [
        {
            title: 'Test post', 
            content: 'Test content',
            id: 1
        }
    ]
);
