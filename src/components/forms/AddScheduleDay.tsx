import {Button, Select, Title} from "@mantine/core";
import {FaUserDoctor} from "react-icons/fa6";
import {MdCancel} from "react-icons/md";
import React, {FormEvent, useRef, useState} from "react";
import {useMutation} from "@tanstack/react-query";
import {BiCalendarEdit} from "react-icons/bi";
import api from "../../libs/axios/axios";
import {AxiosResponse} from "axios";
import {notifications} from "@mantine/notifications";
import {errNotification} from "../../libs/methods/short";
import {useClickOutside} from "@mantine/hooks";


export default function AddScheduleDay() {
    const [show, setShow] = useState(false);
    const [day, setDay] = useState("0");
    const formRef = useRef<HTMLFormElement>(null);

    const {isPending, mutate} = useMutation({
        mutationKey: ["add-schedule day"],
        mutationFn: (e: FormEvent<HTMLFormElement>): Promise<AxiosResponse<{ message: string }>> => {
            return new Promise((resolve, reject) => {
                try {
                    e.preventDefault()
                    // const form = new FormData(e.target as HTMLFormElement);
                    // const data = {day: Number(form.get("day") ?? 0)}
                    resolve(api.post("/admin/add-working-day", {day}))
                } catch (e) {
                    console.log("Reject: ", e)
                    reject(e)
                }
            })
        },
        onSuccess: res => {
            notifications.show({title: "Success!", message: res.data.message})
            formRef.current?.reset()
        },
        onError: err => {
            console.log(err)
            notifications.show(errNotification(err))
        }
    })
    const toggle = () => setShow(!show);
    const dayList = () => ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d, i) => ({
        label: d,
        value: i.toString(),
    }));
    const ref = useClickOutside(() => setShow(false));

    return (
        !show ?
            <Button onClick={toggle} leftSection={<BiCalendarEdit/>} variant={'light'}>
                Add work day
            </Button>
            :
            <div data-aos={'fade-down'}
                 className={"w-max absolute top-0 z-20 bg-white shadow-xl rounded-md p-4"}>
                <Title order={3}>New work day</Title>

                <form ref={formRef} onSubmit={e => mutate(e)} className={"w-[300px] grid gap-2"}>
                    <Select
                        name={'day'}
                        label={"Select day"}
                        defaultValue={day}
                        onChange={val => setDay(val ?? "0")}
                        data={dayList()}
                    />
                    <Button loading={isPending} disabled={isPending} type={'submit'} leftSection={<FaUserDoctor/>}>
                        Add
                    </Button>
                    <Button variant={'outline'} color={'red'} leftSection={<MdCancel/>} onClick={toggle}>
                        Close
                    </Button>
                </form>
            </div>

    )
}

