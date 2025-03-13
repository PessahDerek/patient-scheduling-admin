import {createFileRoute} from '@tanstack/react-router'
import PageLayout from "../../../components/layouts/PageLayout";
import ErrorComponent from "../../../components/ErrorComponent";
import PendingScreen from "../../../components/PendingScreen";
import ListAppointments from "../../../components/tables/ListAppointments";
import {Tabs} from "@mantine/core";
import useDayStores from "../../../stores/useDayStores";
import {useStore} from "zustand/react";
import {useMemo, useState} from "react";
import useAppointmentStore from "../../../stores/useAppointmentStore";
import AppointmentFilter, {AppointmentFilterObj} from "../../../components/filters/AppointmentFilter";


export const Route = createFileRoute('/(app)/__layout/appointments')({
    component: RouteComponent,
    pendingComponent: PendingScreen,
    errorComponent: ErrorComponent,
    shouldReload: true,
    preload: false,
})

function RouteComponent() {
    // const data = useLoaderData({from: "/(app)/__layout/"})
    const {appointments, addAppointments} = useStore(useAppointmentStore)
    const days = useStore(useDayStores, state => state.days)
    const [activeDay, setActiveDay] = useState<string | null>(null)
    const [filters, setFilters] = useState<AppointmentFilterObj>({
        dates: [null, null],
    })

    const defaultDay = days.keys().next().value?.toString() ?? new Date().getDay().toString()
    // const defaultDay = new Date().getUTCDay().toString()

    console.log(new Date().getUTCDay(), " * ", days.keys().next().value)
    const listAppointments = useMemo(() => {
        return [...appointments.values()].filter(f => f.schedule?.workingDay.toString() == (activeDay ?? defaultDay))
    }, [activeDay, appointments])

    return (
        <PageLayout>
            <div>

            </div>
            <Tabs onChange={val => setActiveDay(val)}
                  defaultValue={activeDay ?? defaultDay}>
                <Tabs.List>
                    {/*{listAppointments.map((day, i) =>*/}
                    {[...days.values()].map((day, i) =>
                        <Tabs.Tab key={i} value={day.day.toString()}>{day.dayName}</Tabs.Tab>)}
                </Tabs.List>
                <AppointmentFilter value={filters} setValue={setFilters}/>
                <Tabs.Panel value={activeDay ?? defaultDay}>
                    <ListAppointments list={listAppointments}/>
                </Tabs.Panel>
            </Tabs>
        </PageLayout>
    )
}
