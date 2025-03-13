import {createStore} from "zustand";


interface PatientStoreObj {
    patients: Map<string, UserObj>

    addPatients(users: UserObj[]): void
}

const usePatientStore = createStore<PatientStoreObj>()((set, get) => ({
    patients: new Map(),
    addPatients(users) {
        const newMap = new Map(users.map(u => ([u.id, u])))
        set(prev => ({...prev, patients: newMap}))
    }
}))


export default usePatientStore;

