/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { BlogContext } from "../context";
import { initialState, blogReducer } from "../reducers/BlogReducer";

const PostProvider = ({ children }) => {
    const [state, dispatch] = useReducer(blogReducer, initialState);

    return (
        <BlogContext.Provider value={{ state, dispatch }}>
            {children}
        </BlogContext.Provider>
    );
};

export default PostProvider;
