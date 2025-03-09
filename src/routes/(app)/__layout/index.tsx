import {createFileRoute} from '@tanstack/react-router'
import api from "../../../libs/axios/axios";

// const fetchDoctors = as()

export const Route = createFileRoute('/(app)/__layout/')({
        component: RouteComponent,
    }
)

function RouteComponent() {
    // const [docs, schedules] = useLoaderData({from: "/(app)/__layout/"})
    return <div>Hello "/dashboard/"!</div>
}
