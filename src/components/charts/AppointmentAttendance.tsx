import {Card, CardProps, Title} from "@mantine/core";
import {DonutChart} from "@mantine/charts";
import {useStore} from "zustand/react";
import useAppointmentStore from "../../stores/useAppointmentStore";


interface props extends CardProps {
}


export default function AppointmentAttendance({...rest}: props) {
    const apps = useStore(useAppointmentStore, state => state.appointments)

    const status: AppStatusObj[] = ["missed", "cancelled", "complete"]
    const colors = ['red', 'orange', 'primary']

    return (
        <Card {...rest} className={`w-full ${rest.className}`}>
            <Title c={'primary.9'} order={3}>Appointment attendance</Title>
            <DonutChart
                data={status.map((stat, i) => ({
                    name: stat,
                    value: [...apps.values()].filter(a => a.status === stat).length,
                    color: colors[i],
                }))}
            />
        </Card>
    )
}

