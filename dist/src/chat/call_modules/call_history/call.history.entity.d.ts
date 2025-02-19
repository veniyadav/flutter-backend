import mongoose from "mongoose";
import { CallStatus, MeetPlatform, RoomType } from "../../../core/utils/enums";
export interface ICallHistory {
    _id: string;
    caller: string;
    participants: string[];
    callee?: string;
    callStatus: CallStatus;
    roomId: string;
    withVideo: boolean;
    roomType: RoomType;
    meetPlatform: MeetPlatform;
    deleteFrom: any[];
    endAt?: Date;
    createdAt: Date;
}
export declare const CallHistorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    caller: string;
    roomId: string;
    roomType: string;
    callee: string;
    participants: mongoose.Types.ObjectId[];
    callStatus: CallStatus;
    withVideo: boolean;
    meetPlatform: MeetPlatform;
    endAt: Date;
    deleteFrom: mongoose.Types.ObjectId[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    caller: string;
    roomId: string;
    roomType: string;
    callee: string;
    participants: mongoose.Types.ObjectId[];
    callStatus: CallStatus;
    withVideo: boolean;
    meetPlatform: MeetPlatform;
    endAt: Date;
    deleteFrom: mongoose.Types.ObjectId[];
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    caller: string;
    roomId: string;
    roomType: string;
    callee: string;
    participants: mongoose.Types.ObjectId[];
    callStatus: CallStatus;
    withVideo: boolean;
    meetPlatform: MeetPlatform;
    endAt: Date;
    deleteFrom: mongoose.Types.ObjectId[];
}> & {
    _id: mongoose.Types.ObjectId;
}>;
