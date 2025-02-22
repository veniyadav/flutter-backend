import mongoose from "mongoose";
import { Platform } from "../../core/utils/enums";
export interface IVersion {
    _id: string;
    semVer: string;
    critical: boolean;
    notes: string;
    updateUrl?: string;
    notify: boolean;
    platform: Platform;
}
export declare const VersionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    platform: Platform;
    semVer: string;
    critical: boolean;
    notes: string;
    updateUrl: string;
    notify: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    platform: Platform;
    semVer: string;
    critical: boolean;
    notes: string;
    updateUrl: string;
    notify: boolean;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    platform: Platform;
    semVer: string;
    critical: boolean;
    notes: string;
    updateUrl: string;
    notify: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
}>;
