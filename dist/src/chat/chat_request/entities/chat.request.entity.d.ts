import { Schema } from "mongoose";
import { ChatRequestStatus, RoomType } from "../../../core/utils/enums";
export interface IChatRequest extends Document {
    senderId: string;
    _id: string;
    receiverId: string;
    roomId: string;
    roomType: RoomType;
    status: ChatRequestStatus;
}
export declare const ChatRequestSchema: Schema;
