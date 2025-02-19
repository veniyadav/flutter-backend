import { CallStatus, RoomType } from "../../../core/utils/enums";
export declare class PushCallDataModel {
    readonly callId: string;
    readonly callerId: string;
    readonly userName: string;
    readonly roomId: string;
    readonly userImage: string;
    readonly withVideo: boolean;
    readonly roomType: RoomType;
    readonly callStatus: CallStatus;
    readonly groupName?: string;
    constructor(callId: string, userName: string, callerId: string, userImage: string, roomId: string, withVideo: boolean, callStatus: CallStatus, roomType: RoomType, groupName?: string);
}
