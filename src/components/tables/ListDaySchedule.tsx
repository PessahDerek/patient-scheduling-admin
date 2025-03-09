import {Button, Menu, Table, Text} from "@mantine/core";
import React, {useCallback, useMemo} from "react";
import dayjs from "dayjs";
import {useStore} from "zustand/react";
import scheduleStore from "../../stores/useScheduleStore";
import {BiPencil, BiTrash} from "react-icons/bi";
import {toInputTime} from "../../libs/methods/short";
import useAppointmentStore from "../../stores/useAppointmentStore";
import api from "../../libs/axios/axios";


const shifts: Map<ShiftName, ShiftObj> = new Map()
shifts.set("morning", {
    shift: "morning",
    startTime: dayjs(new Date().setTime(0)).format("HH:mm:ss"),
    endTime: dayjs(new Date().setTime(0)).format("HH:mm:ss"),
}).set("day", {
    shift: "day",
    startTime: dayjs(new Date().setTime(0)).format("HH:mm:ss"),
    endTime: dayjs(new Date().setTime(0)).format("HH:mm:ss"),
}).set("night", {
    shift: "night",
    startTime: dayjs(new Date().setTime(0)).format("HH:mm:ss"),
    endTime: dayjs(new Date().setTime(0)).format("HH:mm:ss"),
})


interface props {
    // schedules: Array<ScheduleObj>;
    day: number;
    setToEdit: (day: ScheduleReqObj) => void;
}

export default function ListDaySchedule({day, setToEdit}: props) {
    const getByDay = useStore(scheduleStore, state => state.scheduleByDay)
    const scheduleList = useMemo(() => {
        return getByDay(day)
    }, [getByDay, day])

    const getStatus = (s: ScheduleObj) => {
        const hrToday = new Date().getHours(), minToday = new Date().getMinutes()
        if (hrToday > s.timeOut.getHours() || hrToday < s.timeIn.getHours())
            return {t: "Out of office", c: 'red'}
        if (minToday > s.timeOut.getMinutes() || minToday < s.timeIn.getMinutes())
            return {t: "Out of office", c: 'orange'}
        return {t: "In office", c: 'green'}
    }

    const {appointments} = useStore(useAppointmentStore)

    const getDocAppointment = useCallback((schedule_id: number, doc_id: string) => {
        console.log(appointments)
        const found = [...appointments.values()].filter(a => a.schedule.id == schedule_id && dayjs(a.date).isSame(new Date()))
        return found.length
    }, [appointments])

    return (
        <div className={"w-full grid gap-2 auto-rows-max pt-2"}>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Doctor</Table.Th>
                        <Table.Th>Time in</Table.Th>
                        <Table.Th>Time out</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Appointments</Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {scheduleList.map((schedule) =>
                        <Table.Tr key={schedule.id}>
                            <Table.Td>{`${schedule.doctor.firstName} ${schedule.doctor.lastName}`}</Table.Td>
                            <Table.Td>{dayjs(schedule.timeIn).format("HH:mm A")}</Table.Td>
                            <Table.Td>{dayjs(schedule.timeOut).format("HH:mm A")}</Table.Td>
                            <Table.Td><Text c={getStatus(schedule).c}>{getStatus(schedule).t}</Text></Table.Td>
                            <Table.Td>{getDocAppointment(schedule.id, schedule.doctor.id)}</Table.Td>
                            <Table.Td>
                                <Menu shadow={'md'}>
                                    <Menu.Target>
                                        <Button>Action</Button>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item
                                            onClick={() => {
                                                if (setToEdit)
                                                    setToEdit({
                                                        day_id: day.toString(),
                                                        doc_id: schedule.doctor.id,
                                                        timeIn: toInputTime(schedule.timeIn),
                                                        timeOut: toInputTime(schedule.timeOut),
                                                        // timeIn: `${schedule.timeIn.getHours()}:${schedule.timeIn.getMinutes()}`,
                                                        // timeOut: `${schedule.timeOut.getHours()}:${schedule.timeOut.getMinutes()}`,
                                                    })
                                            }}
                                            leftSection={<BiPencil/>}>
                                            Edit
                                        </Menu.Item>
                                        <Menu.Item c={'red'} leftSection={<BiTrash/>}>
                                            Delete
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </Table.Td>
                        </Table.Tr>)
                    }
                </Table.Tbody>
            </Table>
        </div>
    )
}

