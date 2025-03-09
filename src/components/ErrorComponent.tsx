import {ErrorComponentProps} from "@tanstack/react-router";
import {Button, Space, Text, Title} from "@mantine/core";
import {useMemo} from "react";
import {TokenExpired} from "../libs/instances/classes";
import {refresh} from "aos";


export default function ErrorComponent({error, reset}: ErrorComponentProps) {
    const message = useMemo(() => {
        if (error instanceof TokenExpired)
            return error.message;
        return error.message ?? "Sorry, something went wrong. Please try again later";
    }, [error])

    return (
        <div className={"w-full h-full flex-1 flex"}>
            <div className={"w-max h-max m-auto"}>
                <Title>Error</Title>
                <Text>{message}</Text>
                <Space />
                <Button onClick={reset}>
                    Refresh
                </Button>
            </div>
        </div>
    )
}
