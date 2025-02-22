import { Document, Schema } from "mongoose";
import { RoomType } from "../../../core/utils/enums";
export interface IRoomMember extends Document {
    uId: string;
    rId: string;
    lSMId: string;
    rT: RoomType;
    t: string;
    tTo?: string;
    tEn: string;
    nTitle: string;
    img: string;
    isD: boolean;
    isA: boolean;
    isM: boolean;
    pId?: string;
    orderId?: string;
    createdAt: Date;
    updatedAt: Date;
    isOneSeen: boolean;
}
export declare const RoomMemberSchema: Schema;
