import React, {useRef, useState} from "react";
import {Button, Radio, TextInput, Title} from "@mantine/core";
import {FaUserDoctor} from "react-icons/fa6";
import {MdAdd, MdCancel} from "react-icons/md";
import {useClickOutside} from "@mantine/hooks";
import {useMutation} from "@tanstack/react-query";
import api from "../../libs/axios/axios";
import {AxiosResponse} from "axios";
import {notifications} from "@mantine/notifications";
import {errNotification} from "../../libs/methods/short";


interface props {
    role: UserRole;
}

export default function AddAdminDoc({role}: props) {
    const [show, setShow] = useState(false);

    const toggle = () => setShow(!show);
    const ref = useClickOutside(() => setShow(false));
    const formRef = useRef<HTMLFormElement>(null);

    const {mutate, isPending} = useMutation({
        mutationKey: ['add-role'],
        mutationFn: async (e: React.FormEvent<HTMLFormElement>): Promise<AxiosResponse> => {
            e.preventDefault()
            const form = new FormData(e.target as HTMLFormElement)
            const data: { [key: string]: string } = {role: role}
            for (const [key, value] of form.entries()) {
                data[key] = value?.toString()
            }
            return new Promise((resolve, reject) => {
                api.post(`/admin/add-role`, data)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        },
        onSuccess: (resp) => {
            notifications.show({title: "Success", message: resp.data.message})
            formRef.current?.reset()
        },
        onError: (err) => {
            console.log(err)
            notifications.show(errNotification(err))
        }
    })


    return (
        <div className={"fixed z-20 bottom-5 w-[300px] grid gap-2"}>
            {show &&
                <div ref={ref} data-aos={'fade-up'} className={"bg-white shadow-xl rounded-md p-4"}>
                    <Title order={3}>New {role}</Title>

                    <form ref={formRef} onSubmit={e => mutate(e)} className={"w-full grid gap-2"}>
                        <TextInput name={"firstName"} placeholder={'First name'}/>
                        <TextInput name={"lastName"} placeholder={'Last name'}/>
                        <TextInput name={"email"} placeholder={'Email'}/>
                        <TextInput name={"phone"} placeholder={'Phone'}/>
                        <div className={"flex gap-2 flex-wrap"}>
                            <Radio name={'gender'} required value={'male'} label={"Male"}/>
                            <Radio name={'gender'} required value={'female'} label={"Female"}/>
                        </div>
                        <Button loading={isPending} disabled={isPending} type={'submit'} leftSection={<FaUserDoctor/>}>
                            Add {role}
                        </Button>
                        <Button variant={'outline'} color={'red'} leftSection={<MdCancel/>} onClick={toggle}>
                            Cancel
                        </Button>
                    </form>
                </div>
            }
            {!show &&
                <Button onClick={toggle} leftSection={<MdAdd/>}>
                    Add new {role}
                </Button>
            }
        </div>
    )
}

