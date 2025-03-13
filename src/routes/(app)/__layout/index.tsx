import {createFileRoute} from '@tanstack/react-router'
import PageLayout from "../../../components/layouts/PageLayout";
import {Card, Flex, Title} from "@mantine/core";
import {useStore} from "zustand/react";
import UseDoctorStore from "../../../stores/useDoctorStore";
import usePatientStore from "../../../stores/usePatientStore";
import DaysActivity from "../../../components/charts/DaysActivity";
import PatientDoctorRatio from "../../../components/charts/PatientDoctorRatio";
import AppointmentAttendance from "../../../components/charts/AppointmentAttendance";


export const Route = createFileRoute('/(app)/__layout/')({
        component: RouteComponent,
    }
)

function RouteComponent() {
    // const [docs, schedules] = useLoaderData({from: "/(app)/__layout/"})
    const {doctors} = useStore(UseDoctorStore)
    const {patients} = useStore(usePatientStore)
    return (
        <PageLayout className={"md:columns-2 space-y-4"}>
            <Flex gap={4} wrap={'wrap'} className={"break-inside-avoid-column"}>
                <Card className={"flex-1 min-w-max bg-primary-200 text-primary-950"}>
                    <Title order={6}>Doctors</Title>
                    <Title order={2}>{doctors.size}</Title>
                </Card>
                <Card className={"flex-1 min-w-max bg-secondary-50 text-secondary-800"}>
                    <Title order={6}>Patients</Title>
                    <Title order={2}>{patients.size}</Title>
                </Card>
            </Flex>
            <PatientDoctorRatio/>
            <AppointmentAttendance/>
            <DaysActivity className={"break-inside-avoid-column"}/>
        </PageLayout>
    )
}
