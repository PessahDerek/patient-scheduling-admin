import {createStore} from "zustand";

interface DoctorStoreObj {
    doctors: Map<string, DoctorObj>
    addDoctors: (doctors: Array<DoctorObj>) => void;
    docsByDay: (day: number | string) => Array<DoctorObj>;
}

const useDoctorStore = createStore<DoctorStoreObj>()((set, get) => ({
    doctors: new Map(),
    addDoctors: (doctors) => {
        const map = new Map(doctors.map(doc => ([doc.id, doc])))
        set(prev => ({...prev, doctors: map}))
    },
    docsByDay: (day) => {

        return []
    }
}))


export default useDoctorStore;