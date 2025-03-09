import {createStore} from "zustand";


interface DayStoreObj {
    days: Map<number, ScheduleDays>;
    addWorkingDays: (workingDays: ScheduleDays[]) => void;
}

const useDayStore = createStore<DayStoreObj>()((set, get) => ({
    days: new Map(),
    addWorkingDays: (wd) => {
        const map = new Map(wd.map(d => ([d.id, d])));
        set(prev => ({...prev, days: map}))
    }
}));


export default useDayStore;
