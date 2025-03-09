import {createContext, useEffect} from "react";
import {ReactNode} from "@tanstack/react-router";
import useDoctorStore from "../stores/useDoctorStore";
import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import api from "../libs/axios/axios";
import useDayStore from "../stores/useDayStores";
import {useStore} from "zustand/react";
import scheduleStore from "../stores/useScheduleStore";


export const DataContext = createContext({})

export function DataContextProvider({children}: { children: ReactNode }) {
    const addDoctors = useStore(useDoctorStore, state => state.addDoctors)
    const addWorkingDays = useStore(useDayStore, state => state.addWorkingDays)
    const addSchedules = useStore(scheduleStore, state => state.addSchedules)
    const {data} = useQuery({
        queryKey: ['initial-data'],
        queryFn: async (): Promise<[AxiosResponse, AxiosResponse, AxiosResponse]> => {
            const docs = await api.get("/app/doctors");
            const workingDays = await api.get("/app/working-days");
            const schedules = await api.get("/app/schedules");
            return await Promise.all([docs, workingDays, schedules])
        },
    })
    useEffect(() => {
        if (data) {
            let [docs, workingDays, schedules] = data
            if (docs)
                addDoctors(docs.data)
            if (workingDays)
                addWorkingDays(workingDays.data)
            if (schedules)
                addSchedules(schedules.data)
        }
    }, [data]);
    return (
        <DataContext.Provider value={{}}>
            {children}
        </DataContext.Provider>
    )
}
