import React, { createContext, useEffect } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useStore } from "zustand/react";
import authStore from "../stores/authStore";

export const AuthContext = createContext({});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { href, pathname } = useLocation();
  const navigate = useNavigate();
  const { loggedIn, token } = useStore(authStore);

  useEffect(() => {
    if (href.toLowerCase().startsWith("/auth") && loggedIn && token)
      navigate({ to: "/" }).catch((err) => console.log(err));
    if (!token && pathname !== "/auth") navigate({ to: "/auth" });
  }, [href, loggedIn]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
