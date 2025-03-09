import * as React from 'react'
import {createRootRoute, Outlet, useLoaderData} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import AuthProvider from "../context/Auth";
import "aos/dist/aos.css"
import AOS from "aos"
import {useEffect} from "react";
import api from "../libs/axios/axios";
import {useStore} from "zustand/react";
import useAppointmentStore from "../stores/useAppointmentStore";

export const Route = createRootRoute({
    component: RootComponent,
    loader: async () => {
        const appointments = (await api.get("/app/all-appointments")).data
        return {appointments}
    },
})

function RootComponent() {
    const {appointments} = useLoaderData({from: "__root__"})
    const {addAppointments} = useStore(useAppointmentStore)
    useEffect(() => {
        AOS.init()
        if (Array.isArray(appointments))
            addAppointments(appointments)
    }, [])
    return (
        <>
            <AuthProvider>
                <Outlet/>
            </AuthProvider>
            <TanStackRouterDevtools position="bottom-right"/>
        </>
    )
}
