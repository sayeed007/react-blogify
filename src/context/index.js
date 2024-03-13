import { createContext } from "react";

const AuthContext = createContext();
const ProfileContext = createContext();
const BlogContext = createContext();
const ForceLogInContext = createContext();

export { AuthContext, BlogContext, ProfileContext, ForceLogInContext };
