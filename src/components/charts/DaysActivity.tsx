import {BarChart} from "@mantine/charts";
import {useStore} from "zustand/react";
import useAppointmentStore from "../../stores/useAppointmentStore";
import useDayStore from "../../stores/useDayStores";
import {Card, CardProps, Title} from "@mantine/core";
import React from "react";

interface props extends CardProps {

}

export default function DaysActivity({...rest}: props) {
    const apps = useStore(useAppointmentStore, state => state.appointments)
    const wd = useStore(useDayStore, state => state.days)
    return (
        <Card {...rest} className={`w-full grid gap-4 p-2 ${rest.className}`}>
            <Title c={'primary.9'} order={3}>Average appointment per working day</Title>
            <BarChart
                title={"Appointments - Days"}
                // curveType={'natural'}
                // w={500}
                h={300}
                dataKey={"day"}
                // series={[...wd.values()].map(d => ({name: "appointments"}))}
                series={[{"name": "appointments"}]}
                // number of appointments for each day
                data={[...wd.values()].map(d => ({
                    "day": d.dayName,
                    "appointments": [...apps.values()].filter(a => new Date(a.date).getDay() == d.day).length
                }))}
            />
        </Card>
    )
}

