import { MailType } from "./enums";
import { IUser } from "../../api/user_modules/user/entities/user.entity";
export declare class PushKeyAndProvider {
    fcm: any[];
    oneSignal: any[];
    voipKeys: any[];
    constructor(fcm: any[], oneSignal: any[], voipKeys: any[]);
}
export declare class SendMailEvent {
    text: string;
    code: string;
    user: IUser;
    mailType: MailType;
}
export interface BaseUser {
    _id: string;
    fullName: string;
    fullNameEn: string;
    userImage: string;
}
export interface JwtDecodeRes {
    userId: string;
    deviceId: string;
}
export interface VRoomsIcon {
    group: string;
    broadcast: string;
    order: string;
}
