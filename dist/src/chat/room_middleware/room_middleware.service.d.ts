import { RoomMemberService } from "../room_member/room_member.service";
import { SingleRoomSettingsService } from "../single_room_settings/single_room_settings.service";
import { IRoomMember } from "../room_member/entities/room_member.entity";
import { ISingleRoomSettings } from "../single_room_settings/entities/single_room_setting.entity";
export declare class RoomMiddlewareService {
    private readonly roomMember;
    private readonly singleRoomSetting;
    constructor(roomMember: RoomMemberService, singleRoomSetting: SingleRoomSettingsService);
    isThereRoomMember(roomId: string, userId: string, select?: any): Promise<IRoomMember>;
    isThereRoomMemberOrThrow(roomId: string, userId: string): Promise<IRoomMember>;
    getSingleRoomId(peerId: string, myId: string): Promise<string>;
    getSingleRoomSetting(user1: string, user2: string): Promise<ISingleRoomSettings>;
    unDeleteAllRoomMembers(roomId: string): Promise<any>;
}
