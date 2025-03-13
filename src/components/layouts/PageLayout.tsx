import React from "react";
import {Title} from "@mantine/core";
import {useLocation} from "@tanstack/react-router";
import {capitalize} from "../../libs/methods/short";

interface props extends React.HtmlHTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function PageLayout({children, ...rest}: props) {
    const {href} = useLocation();
    const title = href.replace("/", "") ? href.replace("/", "") : "Dashboard";

    return (
        <div data-aos={'zoom-in'} className={"w-full h-full grid gap-2 auto-rows-max"}>
            <div className={"w-full h-[50px] border-b border-solid flex justify-start border-b-slate-300"}>
                <Title className={"mt-auto mb-auto"} order={3}>{capitalize(title)}</Title>
            </div>
            <div {...rest} className={`w-full h-full ${rest.className}`}>
                {children}
            </div>
        </div>
    )
}

