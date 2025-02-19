import { NotificationEmitterService } from "../../../common/notification_emitter/notification_emitter.service";
import { RoomMiddlewareService } from "../../room_middleware/room_middleware.service";
import { GroupMemberService } from "../../group_member/group_member.service";
import { BroadcastMemberService } from "../../broadcast_member/broadcast_member.service";
import { UserDeviceService } from "../../../api/user_modules/user_device/user_device.service";
import { IMessage } from "../../message/entities/message.entity";
export declare class NotificationEmitterChannelService {
    readonly emitterService: NotificationEmitterService;
    private readonly middlewareService;
    private readonly groupMember;
    private readonly broadcastMember;
    private readonly userDevice;
    constructor(emitterService: NotificationEmitterService, middlewareService: RoomMiddlewareService, groupMember: GroupMemberService, broadcastMember: BroadcastMemberService, userDevice: UserDeviceService);
    _parseMessageMentions(body: string): string;
    singleChatNotification(peerId: string, msg: IMessage): Promise<void>;
    private emit;
    groupChatNotification(msg: IMessage, groupName: string): Promise<void>;
    broadcastNotification(msg: IMessage): Promise<void>;
}
