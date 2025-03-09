import {ActionIcon, Menu, Table} from "@mantine/core";
import dayjs from "dayjs";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {AiFillPhone} from "react-icons/ai";
import {MdCancel} from "react-icons/md";
import {useState} from "react";
import {BiCalendarEdit} from "react-icons/bi";
import CancelAppointmentForm from "../forms/CancelAppointment";


interface props {
    list: AppointmentObj[]
}

export default function ListAppointments({list}: props) {

    const getColor = (status: AppStatusObj) => {
        switch (status) {
            case "upcoming":
                return "blue"
            case "missed":
                return "red"
            case "complete":
                return "green"
            case "cancelled":
                return "orange"
        }
    }
    const [openMenu, setOpenMenu] = useState<{ [key: number]: boolean }>({});
    const [cancel, setCancel] = useState<AppCancellationObj>({
        appointment_id: undefined,
        reason: ""
    });
    return (
        <div>
            <CancelAppointmentForm cancel={cancel} setCancel={setCancel}/>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Doctor</Table.Th>
                        <Table.Th>Patient</Table.Th>
                        <Table.Th>Date</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Action</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {list.map((app) =>
                        <Table.Tr key={app.id}>
                            <Table.Td>{`${app.schedule.doctor.firstName} ${app.schedule.doctor.lastName}`}</Table.Td>
                            <Table.Td>{`${app.patient.firstName} ${app.patient.lastName}`}</Table.Td>
                            <Table.Td>{dayjs(app.date).format('ddd DD MMM YYYY')}</Table.Td>
                            <Table.Td c={getColor(app.status)}>{app.status}</Table.Td>
                            <Table.Td>
                                <Menu onChange={val => setOpenMenu({[app.id]: val})}>
                                    <Menu.Target>
                                        <ActionIcon>
                                            {openMenu[app.id] ? <FaAngleUp/> : <FaAngleDown/>}
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item leftSection={<AiFillPhone/>}>Call</Menu.Item>
                                        <Menu.Item leftSection={<BiCalendarEdit/>}>Reschedule</Menu.Item>
                                        <Menu.Item
                                            onClick={() => setCancel(p => ({...p, appointment_id: app.id}))}
                                            c={'red'} leftSection={<MdCancel/>}>Cancel</Menu.Item>
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

