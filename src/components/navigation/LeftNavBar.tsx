import DashButton from "../buttons/DashButton";
import ProfileBanner from "../ProfileBanner";
import {useRouter} from "@tanstack/react-router";
import {capitalize} from "../../libs/methods/short";


export default function LeftNavBar() {
    // const {user} = useStore(authStore)
    const router     = useRouter();

    const paths: {
        label: string,
        path: string
    }[] = Object.keys(router.routesByPath).filter(f => !['/auth', '/logout', '/about'].includes(f)).map(key => {
        return ({label: key == '/' ? 'Overview' : capitalize(key.replace("/","")), path: key})
    }).sort((a, b) => a.path.length - b.path.length)
    return (
        <nav className={"w-[200px] h-full bg-white flex flex-col gap-4 auto-rows-max items-center p-2"}>
            <ProfileBanner/>
            <div className={"grid gap-[2px] auto-rows-max w-full"}>
                {paths.map((path, index) => (
                    // @ts-ignore
                    <DashButton text={path.label} to={path.path} key={index}/>
                ))}
                {/*<DashButton text={"Overview"} to={"/"}/>*/}
                {/*<DashButton text={"Schedules"} to={"/schedules"}/>*/}
                {/*<DashButton text={"Doctors"} to={"/doctors"}/>*/}
            </div>
            <div className={"w-full mt-auto grid gap-2 mb-0"}>
                <DashButton text={"Logout"} to={"/logout"}/>
            </div>
        </nav>
    )
}

