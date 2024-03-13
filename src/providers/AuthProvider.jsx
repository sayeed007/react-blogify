/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { AuthContext } from "../context";

import { jwtDecode } from "jwt-decode";

const authenticUserInfo = localStorage.getItem("auth-user") ? JSON.parse(localStorage.getItem("auth-user")) : {};

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        ...authenticUserInfo
        //     "user": {
        //         "id": "8cfb08e1856e16891498",
        //         "email": "bappy@gmail.com",
        //         "firstName": "Sayeed Hossen",
        //         "lastName": "Bappy",
        //         "avatar": null,
        //         "bio": "",
        //         "favourites": []
        //     },
        //     "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjZmIwOGUxODU2ZTE2ODkxNDk4IiwiZW1haWwiOiJiYXBweUBnbWFpbC5jb20iLCJ0eXBlIjoiYWNjZXNzIiwiaWF0IjoxNzA5NTQ4MzIyLCJleHAiOjE3MDk1NTE5MjJ9.w9ctelOrbpZTPB2tP7B70WOdMoOK9wZaTEY7iab_vOg",
        //     "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjhjZmIwOGUxODU2ZTE2ODkxNDk4IiwiZW1haWwiOiJiYXBweUBnbWFpbC5jb20iLCJ0eXBlIjoicmVmcmVzaCIsImlhdCI6MTcwOTU0ODMyMiwiZXhwIjoxNzA5NjM0NzIyfQ.YWVO0z45cn1mU6NCCR7MsaN5F88h5WBbbR__nDJn7G4"
    });


    useEffect(() => {
        if (authenticUserInfo?.refreshToken) {
            const token = authenticUserInfo?.refreshToken;

            const exp = jwtDecode(JSON.stringify(token))?.exp * 1000;
            if (Date.now() >= exp) {
                setAuth(auth => ({
                    ...auth,
                    refreshToken: null,
                    authToken: null
                }));

                localStorage.clear();
            }
        } else {
            setAuth(auth => ({
                ...auth,
                refreshToken: null,
                authToken: null
            }));

            localStorage.clear();
        }


    }, []);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;