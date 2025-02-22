import { Document, Schema } from 'mongoose';
export interface IGroupSettings extends Document {
    _id: string;
    cId: string;
    createdAt: Date;
    desc?: string;
    pinMsg?: {};
    extraData?: {};
    outUsers: string[];
    gName: string;
    gImg: string;
}
export declare const GroupSettingSchema: Schema;
