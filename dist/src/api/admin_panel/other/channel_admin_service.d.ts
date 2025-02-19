import { RoomMemberService } from "../../../chat/room_member/room_member.service";
import { MessageService } from "../../../chat/message/message.service";
import { UserService } from "../../user_modules/user/user.service";
import { SingleRoomSettingsService } from "../../../chat/single_room_settings/single_room_settings.service";
import { OrderRoomSettingsService } from "../../../chat/order_room_settings/single_room_settings.service";
import { GroupSettingsService } from "../../../chat/group_settings/group_settings.service";
import { BroadcastSettingsService } from "../../../chat/broadcast_settings/broadcast_settings.service";
import { ConfigService } from "@nestjs/config";
export declare class ChannelAdminService {
    private readonly roomService;
    private readonly messageService;
    private readonly userService;
    private readonly singleSettingService;
    private readonly orderRoomSettingsService;
    private readonly groupSettingService;
    private readonly broadcastSettingService;
    private readonly config;
    constructor(roomService: RoomMemberService, messageService: MessageService, userService: UserService, singleSettingService: SingleRoomSettingsService, orderRoomSettingsService: OrderRoomSettingsService, groupSettingService: GroupSettingsService, broadcastSettingService: BroadcastSettingsService, config: ConfigService);
    getRoomCounterForPeer(peerId: string): Promise<{
        single: number;
        order: number;
        group: number;
        broadcast: number;
        total: number;
    }>;
    getRoomCounter(): Promise<{
        single: number;
        order: number;
        group: number;
        broadcast: number;
        total: number;
    }>;
    getMessagesCounterForPeer(peerId: string): Promise<{
        messages: number;
        textMessages: number;
        imageMessages: number;
        videoMessages: number;
        voiceMessages: number;
        callMessages: number;
        voiceCallMessages: number;
        videoCallMessages: number;
        fileMessages: number;
        infoMessages: number;
        locationMessages: number;
        allDeletedMessages: number;
    }>;
    getMessagesCounter(): Promise<{
        messages: number;
        textMessages: number;
        imageMessages: number;
        videoMessages: number;
        voiceMessages: number;
        fileMessages: number;
        infoMessages: number;
        callMessages: number;
        voiceCallMessages: number;
        videoCallMessages: number;
        locationMessages: number;
        allDeletedMessages: number;
    }>;
}
