import { Document, Schema } from "mongoose";
export interface IGroupMessageStatus extends Document {
    mId: string;
    rId: string;
    uId: string;
    dAt?: Date;
    sAt?: Date;
    cAt: Date;
}
export declare const GroupMessageStatusSchema: Schema;
