import { Document, Schema } from "mongoose";
export interface ISingleRoomSettings extends Document {
    _id: string;
    cId: string;
    pId: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const SingleRoomSettings: Schema;
