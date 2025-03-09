import {Link, LinkProps, useLocation} from "@tanstack/react-router";
import {IconType} from "react-icons";
import {Button} from "@mantine/core";
import {useMemo} from "react";


interface props extends LinkProps {
    text: string;
    Icon?: IconType;
}

export default function DashButton({text, Icon, ...rest}: props) {
    const {href} = useLocation()
    const active = useMemo(() => {
        return href === rest.to
    }, [href, rest?.to])

    return (
        <Link {...rest} to={rest.to === "/" ? "." : rest.to}>
            <Button classNames={{label: "text-left w-full"}} className={'w-full'} color={active ? 'secondary' : 'primary'} variant={active ? 'light' : 'white'}
                    leftSection={Icon && <Icon/>}>
                {text}
            </Button>
        </Link>
    )
}