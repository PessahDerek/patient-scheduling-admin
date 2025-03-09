import React, {useEffect, useRef, useState} from "react";
import {Button, Select} from "@mantine/core";
import useDoctorStore from "../../stores/useDoctorStore";
import useDayStores from "../../stores/useDayStores";
import {useStore} from "zustand/react";
import {TimeInput} from "@mantine/dates";
import {useMutation} from "@tanstack/react-query";
import api from "../../libs/axios/axios";
import {notifications} from "@mantine/notifications";
import {errNotification} from "../../libs/methods/short";


interface props {
    open: boolean;
    setOpen: (open: boolean) => void;
    defaultData?: ScheduleReqObj;
}

export default function ScheduleDoctor({open, setOpen, defaultData}: props) {
    const {doctors} = useStore(useDoctorStore)
    const {days} = useStore(useDayStores)
    // const [show, setShow] = useState(false);
    const [data, setData] = useState<ScheduleReqObj>({
        day_id: null,
        doc_id: null,
        timeIn: null,
        timeOut: null,
    });

    useEffect(() => {
        if (typeof defaultData !== 'undefined')
            setData(() => ({...defaultData}))
    }, [defaultData]);

    // const ref = useClickOutside(() => setShow(false));
    const formRef = useRef<HTMLFormElement>(null);

    const {mutate, isPending} = useMutation({
        mutationKey: ['schedule-doctor'],
        mutationFn: (e: React.FormEvent<HTMLFormElement>): Promise<{
            message: string
        }> => new Promise((resolve, reject) => {
            e.preventDefault();
            const url = defaultData ? "/admin/edit-doc-schedule" : "/admin/schedule-doctor"
            api.post(url, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        }),
        onSuccess: (response) => {
            notifications.show({title: "Success!", message: response.message});
            formRef.current?.reset();
        },
        onError: (error) => {
            notifications.show(errNotification(error))
        }
    })

    if (!open)
        return null;
    return (
        <form ref={formRef} onSubmit={mutate}
              className={"w-full min-w-[300px] p-2 z-20 grid gap-2 bg-white absolute top-full"}>
            <Select
                label={"Select doctor"}
                value={data.doc_id}
                onChange={(val) => setData(p => ({...p, doc_id: val}))}
                data={[...doctors.values()].map(doc => ({
                    label: doc.firstName + " " + doc.lastName,
                    value: doc.id
                }))}
            />
            <Select
                label={"Select day"}
                value={data.day_id}
                onChange={(val) => setData(p => ({...p, day_id: val}))}
                data={[...days.values()].map(day => ({
                    label: day.dayName,
                    value: day.id.toString()
                }))}
            />
            <TimeInput
                label={"Time In"}
                value={data.timeIn ?? ""}
                onChange={e => setData(p => ({...p, timeIn: e.target.value}))}
            />
            <TimeInput
                label={"Time Out"}
                value={data.timeOut ?? ""}
                onChange={e => setData(p => ({...p, timeOut: e.target.value}))}
            />
            <Button type={'submit'}>
                Submit
            </Button>
            <Button onClick={() => {
                setOpen(false);
            }} variant={'outline'} type={'submit'}>
                Cancel
            </Button>
        </form>
    )
}

