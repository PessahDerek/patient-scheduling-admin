import {createFileRoute, Outlet, useNavigate} from '@tanstack/react-router'
import LeftNavBar from '../../components/navigation/LeftNavBar'
import {useEffect} from 'react'
import {useCookies} from 'react-cookie'

export const Route = createFileRoute('/(app)/__layout')({
    component: RouteComponent,
})

function RouteComponent() {
    const [{loggedIn, token}, _sk, _rk] = useCookies(['loggedIn', 'token'])
    const navigate = useNavigate()
    useEffect(() => {
        if (!loggedIn || !token) {
            navigate({to: '/auth'}).catch((err) => console.error(err))
        }
    }, [loggedIn, token])
    return (
        <div className={'w-full h-screen flex gap-2'}>
            <LeftNavBar/>
            <div className={'flex-1 w-full h-screen overflow-y-auto'}>
                <Outlet/>
            </div>
        </div>
    )
}
