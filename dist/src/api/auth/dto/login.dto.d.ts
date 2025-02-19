import { Platform, RegisterMethod } from "../../../core/utils/enums";
export default class LoginDto {
    platform: Platform;
    ip: string;
    isactive: boolean;
    email: string;
    method: RegisterMethod;
    password: string;
    pushKey?: string;
    language: string;
    deviceInfo: any;
    deviceId: string;
}
