import mongoose from "mongoose";
import { Platform } from "../../../core/utils/enums";
export interface IReport {
    uId: string;
    content: string;
    type: string;
    targetId: string;
    isDeleted: boolean;
    platform: Platform;
}
export declare const ReportSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: string;
    uId: string;
    content: string;
    targetId: string;
    isDeleted: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: string;
    uId: string;
    content: string;
    targetId: string;
    isDeleted: boolean;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: string;
    uId: string;
    content: string;
    targetId: string;
    isDeleted: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
