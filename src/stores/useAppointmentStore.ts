import {create, createStore} from "zustand";

interface AppointmentStoreObj {
    appointments: Map<number, AppointmentObj>;

    addAppointments(appointments: Array<AppointmentObj>): void;

}

const useAppointmentStore = createStore<AppointmentStoreObj>()((set, get) => ({
    appointments: new Map(),
    addAppointments(appointments) {
        const newMap = new Map(appointments.map(app => ([app.id, app])));
        set(prev => ({...prev, appointments: newMap}));
    }
}));


export default useAppointmentStore;

