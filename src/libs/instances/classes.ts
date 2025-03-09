import {AxiosError} from "axios";

export class AppError extends Error {
    type: "Auth" | "App" = "App"
    status: number = 500;

    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
        this.log()
    };

    private log() {
        console.log(`${this.type} Error: ${this.message}\n${new Date().toISOString()}`);
    }
}

export class TokenExpired extends AxiosError {
    status = 401;
    message: string = "Your session has expired! Please log in to proceed!";

    constructor() {
        super();
        this.message = (this.response?.data as { message: string })?.message ?? this.message;
        this.sideEffect()
    }

    sideEffect() {
        localStorage.removeItem("token");
    }
}

