import mongoose from "mongoose";
import { Platform, VPushProvider } from "../../../../core/utils/enums";
export interface IUserDevice {
    _id: string;
    userDeviceId: string;
    uId: string;
    lastSeenAt: Date;
    visits: number;
    deviceInfo: {};
    platform: Platform;
    dIp: string;
    pushProvider?: VPushProvider;
    language: String;
    pushKey?: string;
    voipKey?: string;
    clintVersion?: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const UserDeviceSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userDeviceId: string;
    uId: mongoose.Types.ObjectId;
    deviceInfo: any;
    dIp: string;
    pushProvider: string;
    platform: Platform;
    pushKey: string;
    voipKey: string;
    language: string;
    lastSeenAt: Date;
    visits: number;
    clintVersion?: string;
    createdAt?: Date;
    updatedAt?: Date;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userDeviceId: string;
    uId: mongoose.Types.ObjectId;
    deviceInfo: any;
    dIp: string;
    pushProvider: string;
    platform: Platform;
    pushKey: string;
    voipKey: string;
    language: string;
    lastSeenAt: Date;
    visits: number;
    clintVersion?: string;
    createdAt?: Date;
    updatedAt?: Date;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userDeviceId: string;
    uId: mongoose.Types.ObjectId;
    deviceInfo: any;
    dIp: string;
    pushProvider: string;
    platform: Platform;
    pushKey: string;
    voipKey: string;
    language: string;
    lastSeenAt: Date;
    visits: number;
    clintVersion?: string;
    createdAt?: Date;
    updatedAt?: Date;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
