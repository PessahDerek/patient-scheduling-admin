import {Card, CardProps} from "@mantine/core";


interface props extends CardProps {

}

export default function DayCoverage({...rest}: props) {

    return (
        <Card {...rest} className={` ${rest.className}`}>

        </Card>
    )
}

