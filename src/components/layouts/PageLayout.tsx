import React from "react";
import {Title} from "@mantine/core";
import {useLocation} from "@tanstack/react-router";
import {capitalize} from "../../libs/methods/short";

interface props {
    children: React.ReactNode;
}

export default function PageLayout({children}: props) {
    const {href} = useLocation();
    return (
        <div data-aos={'zoom-in'} className={"w-full h-full"}>
            <div className={"w-full h-[50px] border-b border-solid flex justify-start border-b-slate-300"}>
                <Title className={"mt-auto mb-auto"} order={3}>{capitalize(href.replace("/", ""))}</Title>
            </div>
            <div className={"w-full h-full"}>
                {children}
            </div>
        </div>
    )
}

