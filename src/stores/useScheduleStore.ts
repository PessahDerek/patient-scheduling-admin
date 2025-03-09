import {createStore} from "zustand";
import dayjs from "dayjs";

interface ScheduleStoreObj {
    schedules: Map<number, ScheduleObj>,
    addSchedules: (schedules: Array<ScheduleObj>) => void;
    scheduleByDay: (day: string | number) => Array<ScheduleObj>;
}

const scheduleStore = createStore<ScheduleStoreObj>()((set, get) => ({
    schedules: new Map(),
    addSchedules: (schedules: Array<ScheduleObj>) => {
        const map = new Map(schedules.map(schedule => {
            schedule['timeIn'] = new Date(schedule.timeIn);
            schedule['timeOut'] = new Date(schedule.timeOut);
            return [schedule.id, schedule]
        }));
        set(prev => ({...prev, schedules: map}))
    },
    scheduleByDay: (day) => {
        const docs = [...get().schedules.values()].filter(sch => sch.workingDay.id === day);
        return docs.sort((a, b) => dayjs(a.timeIn).isAfter(b.timeIn) ? 1 : -1);
    }
}))

export default scheduleStore;
