import {DatePickerInput, DatesRangeValue} from "@mantine/dates";
import React from "react";

export interface AppointmentFilterObj {
    dates: DatesRangeValue;
}

interface props {
    value: AppointmentFilterObj
    setValue: React.Dispatch<React.SetStateAction<AppointmentFilterObj>>
}

export default function AppointmentFilter({value, setValue}: props) {

    return (
        <div className={"p-2 w-full flex gap-2 rounded-lg bg-white"}>
            <DatePickerInput
                value={value.dates}
                onChange={val => setValue(prev => ({...prev, dates: val}))}
                label={"Date"} type={'range'}
                placeholder={'Filter by date'}
            />

        </div>
    )
}

