import { createFileRoute } from "@tanstack/react-router";
import { Loader, Text } from "@mantine/core";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import authStore from "../../../stores/authStore";

export const Route = createFileRoute("/(app)/__layout/logout")({
  component: RouteComponent,
});

function RouteComponent() {
  const [_d, _sk, removeCookie] = useCookies(["loggedIn", "token"]);

  useEffect(() => {
    setTimeout(() => {
      authStore.getState().logOut();
    }, 3000);
  }, []);
  return (
    <div className={"w-full h-full flex "}>
      <div
        className={
          "w-max h-max animate-bounce justify-center text-primary items-center grid gap-4 m-auto"
        }
      >
        <Loader className={"animate-spin m-auto"} />
        <Text>Goodbye</Text>
      </div>
    </div>
  );
}
