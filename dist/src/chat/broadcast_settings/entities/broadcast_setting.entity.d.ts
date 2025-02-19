import { Document, Schema } from "mongoose";
export interface IBroadcastSetting extends Document {
    _id: string;
    outUsers: [];
    cId: string;
    bName: string;
    bImg: string;
    createdAt: Date;
}
export declare const BroadcastSettingSchema: Schema;
