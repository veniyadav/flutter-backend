import mongoose from "mongoose";
import { MailType, RegisterMethod, RegisterStatus, UserPrivacyTypes, UserRole } from "../../../../core/utils/enums";
import { IUserDevice } from "../../user_device/entities/user_device.entity";
import { UserGlobalCallStatus } from "../../../../chat/call_modules/utils/user-global-call-status.model";
export interface IUser {
    _id: string;
    email: string;
    fullName: string;
    fullNameEn: string;
    password: string;
    uniqueCode: number;
    bio?: string;
    lastMail: {
        type: MailType;
        sendAt: Date;
        code: number;
        expired: boolean;
    };
    banTo?: Date;
    verifiedAt?: Date;
    registerStatus: RegisterStatus;
    registerMethod: RegisterMethod;
    userImage: string;
    createdAt: Date;
    deletedAt?: Date;
    countryId?: string;
    updatedAt: Date;
    lastSeenAt: Date;
    roles: UserRole[];
    userPrivacy: UserPrivacy;
    currentDevice: IUserDevice;
    userGlobalCallStatus?: UserGlobalCallStatus;
}
export interface UserPrivacy {
    startChat: UserPrivacyTypes;
    publicSearch: boolean;
    showStory: UserPrivacyTypes;
    lastSeen: boolean;
}
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    lastSeenAt: Date;
    email: string;
    fullName: string;
    fullNameEn: string;
    bio: string;
    isactive: boolean;
    userGlobalCallStatus: any;
    uniqueCode: number;
    password: string;
    lastMail: any;
    verifiedAt: Date;
    userImage: string;
    registerStatus: RegisterStatus;
    registerMethod: RegisterMethod;
    roles: string[];
    banTo: Date;
    countryId: mongoose.Types.ObjectId;
    deletedAt: Date;
    userPrivacy: any;
    createdAt?: Date;
    updatedAt?: Date;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    lastSeenAt: Date;
    email: string;
    fullName: string;
    fullNameEn: string;
    bio: string;
    isactive: boolean;
    userGlobalCallStatus: any;
    uniqueCode: number;
    password: string;
    lastMail: any;
    verifiedAt: Date;
    userImage: string;
    registerStatus: RegisterStatus;
    registerMethod: RegisterMethod;
    roles: string[];
    banTo: Date;
    countryId: mongoose.Types.ObjectId;
    deletedAt: Date;
    userPrivacy: any;
    createdAt?: Date;
    updatedAt?: Date;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    lastSeenAt: Date;
    email: string;
    fullName: string;
    fullNameEn: string;
    bio: string;
    isactive: boolean;
    userGlobalCallStatus: any;
    uniqueCode: number;
    password: string;
    lastMail: any;
    verifiedAt: Date;
    userImage: string;
    registerStatus: RegisterStatus;
    registerMethod: RegisterMethod;
    roles: string[];
    banTo: Date;
    countryId: mongoose.Types.ObjectId;
    deletedAt: Date;
    userPrivacy: any;
    createdAt?: Date;
    updatedAt?: Date;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
