import { Avatar, Text, Title } from "@mantine/core";
import { useCookies } from "react-cookie";
import { capitalize } from "../libs/methods/short";
import React from "react";
import { useStore } from "zustand";
import authStore from "../stores/authStore";

export default function ProfileBanner() {
  const { user } = useStore(authStore);
  return (
    <div className={"w-full h-max flex p-4 bg-primary rounded-md text-white"}>
      <div className={"m-auto w-full flex gap-2"}>
        <Avatar
          className={"m-auto"}
          size={"lg"}
          src={"/img/icon2.jpg"}
          role={user?.role}
        />
        <div className={"flex-1 m-auto grid auto-rows-max gap-2"}>
          <Title order={5}>{capitalize(user?.firstName ?? "")}</Title>
          <Text>{user?.role}</Text>
        </div>
      </div>
    </div>
  );
}
