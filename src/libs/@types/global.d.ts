declare type UserRole = "patient" | "doctor"

declare type ShiftName = "morning" | "day" | "night"

declare type ShiftObj = {
    shift: ShiftName;
    startTime: string;
    endTime: string;
}

declare interface UserObj {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    role: UserRole;
}

declare interface DoctorObj extends UserObj {
    role: "doctor";
}

declare interface ScheduleObj {
    id: number;
    doctor: DoctorObj;
    workingDay: ScheduleDays;
    timeIn: Date;
    timeOut: Date;
}

declare interface ScheduleReqObj {
    timeIn: string | null;
    timeOut: string | null,
    doc_id: string | null;
    day_id: string | null;
}

declare interface ScheduleDays {
    id: number;
    day: number;
    dayName: string;
    // schedules: ScheduleObj[];
}

type AppStatusObj = "upcoming" | "cancelled" | "missed" | "completed"

declare interface AppointmentObj {
    id: number;
    schedule: ScheduleObj;
    patient: UserObj;
    timeIn: Date;
    timeOut: Date;
    date: Date;
    status: AppStatusObj;
}
declare interface AppCancellationObj {
    appointment_id: number | undefined,
    reason: string
}