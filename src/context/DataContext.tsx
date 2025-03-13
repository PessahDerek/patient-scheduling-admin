import {createContext, useEffect} from "react";
import {ReactNode} from "@tanstack/react-router";
import useDoctorStore from "../stores/useDoctorStore";
import {useQuery} from "@tanstack/react-query";
import {AxiosResponse} from "axios";
import api from "../libs/axios/axios";
import useDayStore from "../stores/useDayStores";
import {useStore} from "zustand/react";
import scheduleStore from "../stores/useScheduleStore";
import usePatientStore from "../stores/usePatientStore";


export const DataContext = createContext({})

export function DataContextProvider({children}: { children: ReactNode }) {
    const addDoctors = useStore(useDoctorStore, state => state.addDoctors)
    const addPatients = useStore(usePatientStore, state => state.addPatients)
    const addWorkingDays = useStore(useDayStore, state => state.addWorkingDays)
    const addSchedules = useStore(scheduleStore, state => state.addSchedules)
    const {data} = useQuery({
        queryKey: ['initial-data'],
        queryFn: async (): Promise<[AxiosResponse, AxiosResponse, AxiosResponse, AxiosResponse]> => {
            const docs = await api.get("/app/users", {params: {type: "doctor"}});
            const workingDays = await api.get("/app/working-days");
            const schedules = await api.get("/app/schedules");
            const patients = await api.get("/app/users", {params: {type: 'patient'}})
            return await Promise.all([docs, workingDays, schedules, patients])
        },
    })
    useEffect(() => {
        if (data) {
            let [docs, workingDays, schedules, patients] = data
            if (docs)
                addDoctors(docs.data)
            if (workingDays)
                addWorkingDays(workingDays.data)
            if (schedules)
                addSchedules(schedules.data)
            if (patients)
                addPatients(patients.data)
        }
    }, [data]);
    return (
        <DataContext.Provider value={{}}>
            {children}
        </DataContext.Provider>
    )
}
