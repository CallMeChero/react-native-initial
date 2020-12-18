import React, { useReducer } from 'react';
import CreateDataContext from './CreateDataContext';

const blogReducer = (state,action) => {
    switch (action.type) {
        case 'add_blogpost':
            return [...state, {title: `Blog Post #${state.length + 1}`}]
    }
};

const addBlogPost = () => {
    dispatch({
        type: 'add_blogpost'
    })
};

export const { Context, Provider } = CreateDataContext(
    blogReducer, 
    { addBlogPost },
    []
);
