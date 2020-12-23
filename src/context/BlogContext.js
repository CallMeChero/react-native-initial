import CreateDataContext from './CreateDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state,action) => {
    switch (action.type) {
        case 'get_blogposts':
            return action.payload
        // case 'add_blogpost':
        //     return [...state, 
        //         {
        //             id: Math.floor(Math.random() * 99999), 
        //             title: action.payload.title,
        //             content: action.payload.content
        //         }
        //     ];
        case 'edit_blogpost':
            return state.map((blogPost) => {
                return blogPost.id === action.payload.id ? action.payload : blogPost
            })
        case 'delete_blogpost':
            return state.filter(item => item.id !== action.payload)
    }
};

const getBlogPosts = dispatch => {
    return async () => {
        const response = await jsonServer.get('/blogposts');

        dispatch({type:'get_blogposts', payload: response.data})
    }
};

const addBlogPost = (dispatch) => {
    return async (title, content, callback) => {
        await jsonServer.post('/blogposts', { title: title, content: content});
        if(callback) {
            callback();
        }
    }

    // return (title, content, callback) => {
    //     dispatch({
    //         type: 'add_blogpost',
    //         payload: {
    //             title: title,
    //             content: content
    //         }
    //     })
    //     if(callback) {
    //         callback();
    //     }
    // }
};

const editBlogPost = (dispatch) => {
    return async (id, title, content, callback) => {
        await jsonServer.put(`/blogposts/${id}`, { title: title, content: content})
        // na pravom projektu bi opalili ponovno getAll
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
    return async (id) => {
        await jsonServer.delete(`/blogposts/${id}`);
        // na pravom projektu bi opalili ponovno getAll
        dispatch({ type: 'delete_blogpost', payload: id })
    }
};

export const { Context, Provider } = CreateDataContext(
    blogReducer, 
    { getBlogPosts, addBlogPost, deleteBlogPost, editBlogPost },
    []
);
