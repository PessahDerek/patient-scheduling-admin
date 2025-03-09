import {createFileRoute, useParams} from '@tanstack/react-router'
import {Button, PasswordInput, Text, TextInput, Title} from '@mantine/core'
import React from 'react'
import {useMutation} from '@tanstack/react-query'
import api from '../libs/axios/axios'
import {AxiosResponse} from 'axios'
import {useCookies} from 'react-cookie'
import {notifications} from '@mantine/notifications'
import {errNotification} from '../libs/methods/short'

export const Route = createFileRoute('/auth')({
    component: RouteComponent,
})

function RouteComponent() {
    const [_data, setCookie, _rk] = useCookies(['loggedIn', 'role', 'token', 'firstName'])

    const {mutate, isPending} = useMutation({
        mutationKey: ['authentication'],
        mutationFn: async (
            e: React.FormEvent<HTMLFormElement>,
        ): Promise<
            AxiosResponse<{
                token: string
                message: string
                user: {
                    role: UserRole,
                    firstName: string,
                }
            }>
        > => {
            e.preventDefault()
            const data = new FormData(e.target as HTMLFormElement)
            const serialized: { [key: string]: string } = {}
            for (const [key, value] of data.entries()) {
                serialized[key] = value.toString()
            }
            return new Promise((resolve, reject) => {
                try {
                    resolve(api.post(`/auth/login`, serialized))
                } catch (err) {
                    reject(err)
                }
            })
        },
        onSuccess: (result) => {
            setCookie('loggedIn', true)
            setCookie('role', result.data.user.role)
            setCookie('token', result.data.token)
            setCookie('firstName', result.data.user.firstName)
            localStorage.setItem('token', result.data.token)
            notifications.show({title: 'Success!', message: result.data.message})
        },
        onError: (error) => {
            console.log(error)
            notifications.show(errNotification(error))
        },
    })


    return (
        <div className={'w-full min-h-screen flex justify-center items-center'}>
            <div className={'w-max h-max bg-white grid gap-2 p-4 rounded-md'}>
                <Title className={'text-primary-700 text-center'}>M.A.P.S.S</Title>
                <Text className={'text-center'}>
                    Mathare Automatic Patient Scheduling System
                </Text>
                <form onSubmit={mutate} className={'w-full grid gap-2'}>
                    <TextInput name={'role'} value={'admin'} readOnly hidden/>
                    <TextInput name={'contact'} required placeholder={'Phone/email'}/>
                    <PasswordInput name={'password'} required placeholder={'Password'}/>
                    <Button type={'submit'} disabled={isPending} loading={isPending}>
                        Sign in
                    </Button>
                    <Button variant={'light'}>Forgot password</Button>
                </form>
            </div>
        </div>
    )
}
