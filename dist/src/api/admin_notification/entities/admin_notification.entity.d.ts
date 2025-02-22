import mongoose from "mongoose";
export interface IAdminNotification {
    content: string;
    title: string;
    imageUrl?: string;
}
export declare const AdminNotificationSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    content: string;
    title: string;
    imageUrl?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    content: string;
    title: string;
    imageUrl?: string;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    content: string;
    title: string;
    imageUrl?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
