import mongoose from "mongoose";
export interface IMeetMember {
    _id: string;
    userId: string;
    callId: string;
    userDeviceId: string;
    roomId: string;
}
export declare const MeetMemberSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userDeviceId: string;
    callId: string;
    roomId: string;
    userId: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userDeviceId: string;
    callId: string;
    roomId: string;
    userId: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    userDeviceId: string;
    callId: string;
    roomId: string;
    userId: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
