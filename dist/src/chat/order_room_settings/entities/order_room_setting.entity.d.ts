import { Document, Schema } from "mongoose";
export interface IOrderRoomSettings extends Document {
    _id: string;
    cId: string;
    pId: string;
    pinData?: object;
    orderTitle?: string;
    orderImage?: string;
    orderId: string;
    closedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const OrderRoomSettings: Schema;
