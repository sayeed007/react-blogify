import { useContext } from "react";
import { ForceLogInContext } from "../context";

export const useForceLogIn = () => {
    return useContext(ForceLogInContext);
};
