import React from "react";
import {Card, CardProps, Title} from "@mantine/core";
import {DonutChart} from "@mantine/charts";
import {useStore} from "zustand/react";
import usePatientStore from "../../stores/usePatientStore";
import useDoctorStore from "../../stores/useDoctorStore";


interface props extends CardProps {

}

export default function PatientDoctorRatio({...rest}: props) {
    const patients = useStore(usePatientStore, state => state.patients);
    const docs = useStore(useDoctorStore, state => state.doctors);
    return (
        <Card {...rest} className={` ${rest.className}`}>
            <Title c={'primary.9'} order={3}>Patient - Doctor Ratio</Title>
            <DonutChart
                withLabels
                withLabelsLine
                labelsType={"percent"}
                data={[
                    {name: "Patients", value: patients.size, color: "secondary"},
                    {name: "Doctors", value: docs.size, color: "primary"},
                ]}
                labelColor={'orange'}
            />
        </Card>
    )
}

