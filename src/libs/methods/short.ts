import {AxiosError} from "axios";
import dayjs from "dayjs";


export const errNotification = (error: Error | unknown): { title: "Error!", message: string, color: string } => {

    const message = error instanceof AxiosError ?
        error.response?.data?.message ? error.response?.data?.message : error.response?.statusText ?? error?.message
        : "Something went wrong!";

    return {title: "Error!", message: message, color: 'red'};
}

export const capitalize = (str: string) => {
    return `${str[0]?.toUpperCase() ?? ""}${str?.slice(1).toLowerCase()}`
}

export const toInputTime = (datetime: Date) => {
    // let hr = datetime.getHours(), min = datetime.getMinutes();
    // const hours = hr > 9 ? `${hr}` : `0${hr}`;
    // const minutes = hr < 10 ? `0${hr}` : `${hr}`;
    // return `${hours}:${minutes}: ${}`;
    return dayjs(datetime).format("HH:mm:ss")
}
