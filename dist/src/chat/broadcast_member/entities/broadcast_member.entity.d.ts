import { Document, Schema } from "mongoose";
import { BaseUser } from "../../../core/utils/interfaceces";
export interface IBroadcastMember extends Document {
    _id: string;
    uId: string;
    rId: string;
    bId: string;
    userData: BaseUser;
    createdAt: Date;
}
export declare const BroadcastMemberSchema: Schema;
