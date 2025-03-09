import {createFileRoute, ErrorComponent} from '@tanstack/react-router'
import PageLayout from "../../../components/layouts/PageLayout";
import api from "../../../libs/axios/axios";
import {AxiosResponse} from "axios";
import AddScheduleDay from "../../../components/forms/AddScheduleDay";
import {Button, Tabs} from "@mantine/core";
import ListDaySchedule from "../../../components/tables/ListDaySchedule";
import ScheduleDoctor from "../../../components/forms/ScheduleDoctor";
import {useStore} from "zustand/react";
import useDayStores from "../../../stores/useDayStores";
import {BiCalendarEdit} from "react-icons/bi";
import React from "react";

export const Route = createFileRoute('/(app)/__layout/schedules')({
    component: RouteComponent,
    loader: (): Promise<AxiosResponse<ScheduleDays[]>> =>
        new Promise((resolve, reject) => {
            api.get("/app/schedules").then((response) => resolve(response))
                .catch(err => reject(err))
        }),
    shouldReload: true,
    errorComponent: e => ErrorComponent(e),
})

function RouteComponent() {
    // const {data} = useLoaderData({from: "/(app)/__layout/schedules"})
    const {days} = useStore(useDayStores)
    const [show, setShow] = React.useState(false);
    const [active, setActive] = React.useState<ScheduleReqObj | undefined>();

    const setToEdit = (editData: ScheduleReqObj) => {
        setShow(true)
        setActive(editData)
    }
    return (
        <PageLayout>
            <div className={"w-full h-full flex-1 p-2"}>
                <div className={"w-full h-[50px] flex gap-2"}>
                    <AddScheduleDay/>
                    <Button leftSection={<BiCalendarEdit/>} variant={"light"} onClick={() => setShow(!show)}>
                        {show ? "Close" : "Add doctor schedule"}
                    </Button>
                    <ScheduleDoctor
                        defaultData={active}
                        open={show}
                        setOpen={(open) => {
                            setShow(open)
                            if (!open) {
                                setActive(undefined)
                            }
                        }}
                    />
                </div>
                <Tabs defaultValue={days.keys().next().value?.toString() ?? null}>
                    <Tabs.List>
                        {[...days.values()].map(day =>
                            <Tabs.Tab key={day.id} value={day.id.toString()}>
                                {day.dayName}
                            </Tabs.Tab>)}
                    </Tabs.List>
                    {
                        [...days.keys()].map(day =>
                            <Tabs.Panel value={day.toString()} key={day}>
                                <ListDaySchedule
                                    setToEdit={setToEdit}
                                    day={day} key={day}
                                />
                            </Tabs.Panel>)
                    }
                </Tabs>
            </div>
        </PageLayout>
    )
}
