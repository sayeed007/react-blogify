/* eslint-disable react/prop-types */
import { useReducer } from "react";
import { ForceLogInContext } from "../context";
import { initialState, forceLogInReducer } from "../reducers/ForceLogInReducer";

const ForceLogInProvider = ({ children }) => {
    const [state, dispatch] = useReducer(forceLogInReducer, initialState);

    return (
        <ForceLogInContext.Provider value={{ state, dispatch }}>
            {children}
        </ForceLogInContext.Provider>
    );
};

export default ForceLogInProvider;
