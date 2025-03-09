import {createFileRoute, useLoaderData} from '@tanstack/react-router'
import PageLayout from "../../../components/layouts/PageLayout";
import {Loader, Text} from "@mantine/core";
import ListUsers from "../../../components/tables/ListUsers";
import loadUsers from "../../../libs/loaders/load.users";
import AddAdminDoc from "../../../components/forms/AddAdminDoc";
import {AxiosError} from "axios";
import {useCookies} from "react-cookie";

export const Route = createFileRoute('/(app)/__layout/doctors')({
    component: RouteComponent,
    loader: (ctx): Promise<UserObj[]> => {
        return new Promise((resolve, reject) => {
            loadUsers(ctx.route.path)
                .then(users => resolve(users.data))
                .catch(err => reject(err));
        })
    },
    shouldReload: true,
    errorComponent: ({error}) => {
        const [_d, _sk, removeCookie] = useCookies(['loggedIn', 'token']);
        if (error instanceof AxiosError) {
            if (error.status === 401) {
                setTimeout(() => {
                    removeCookie('loggedIn')
                    removeCookie('token')
                }, 5000)
                return <div>
                    <div>
                        <Loader/>
                        <Text>{error.response?.data.message ?? "Logging you out!"}</Text>
                    </div>
                </div>
            }
        }
        return <></>
    }
})

function RouteComponent() {
    const data = useLoaderData({from: "/(app)/__layout/doctors"})
    return (
        <PageLayout>
            <ListUsers users={data}/>
            <AddAdminDoc role={'doctor'}/>
        </PageLayout>
    )
}
