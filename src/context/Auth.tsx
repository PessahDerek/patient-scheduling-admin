import React, {createContext, useEffect, useMemo, useState} from "react";
import {useCookies} from "react-cookie";
import {useLocation, useNavigate} from "@tanstack/react-router";

interface AuthDataObj {
    loggedIn: boolean,
    role: UserRole
}

export const AuthContext = createContext<{
    data: AuthDataObj,
    // setData: React.Dispatch<React.SetStateAction<AuthDataObj>>
}>({
    data: {
        loggedIn: false,
        role: "patient",
    },
    // setData: () => {
    // }
})

export default function AuthProvider({children}: { children: React.ReactNode }) {
    const {href} = useLocation();
    const navigate = useNavigate()
    const [{loggedIn, role, token}, setCookie, _rk] = useCookies(["loggedIn", "role", "token"]);
    const data: AuthDataObj = useMemo(() => {
        return {loggedIn, role}
    }, [loggedIn, role])

    useEffect(() => {
        const token = localStorage.getItem("token")
        setCookie('loggedIn', token ?? undefined);
    }, [])
    useEffect(() => {
        if (href.toLowerCase().startsWith("/auth") && (loggedIn && token))
            navigate({to: "/"}).catch(err => console.log(err));
        // _rk('loggedIn')
    }, [href, loggedIn])

    return (
        <AuthContext.Provider value={{data}}>
            {children}
        </AuthContext.Provider>
    )
}

