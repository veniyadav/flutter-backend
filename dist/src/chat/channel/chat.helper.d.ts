import mongoose from "mongoose";
import { BaseUser } from "../../core/utils/interfaceces";
import { MessageType } from "../../core/utils/enums";
import { IUser } from "../../api/user_modules/user/entities/user.entity";
import { SendMessageDto } from "./dto/send.message.dto";
export interface OneFullRoomModel {
    roomId: string;
    userId: string;
    deleteIsDKey?: boolean;
    filter?: {};
}
export interface getChannelType {
    filter: {};
    myIdObj: mongoose.Types.ObjectId;
    limit: number;
    page: number;
}
export declare function getMsgDtoObj(dto: {
    localId?: string;
    _pBId?: string;
    _id?: string;
    peerData?: BaseUser;
    mT: MessageType;
    rId: string;
    user: IUser;
    content: string;
    att: {};
}): SendMessageDto;
