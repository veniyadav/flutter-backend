/// <reference types="node" />
import { Platform, RegisterMethod } from "../../../core/utils/enums";
export default class RegisterDto {
    ip: string;
    imageBuffer?: Buffer;
    isactive: boolean;
    email: string;
    fullName: string;
    deviceId: string;
    pushKey?: string;
    language: string;
    deviceInfo: string;
    method: RegisterMethod;
    platform: Platform;
    password: string;
    id: string;
    myUser: any;
}
