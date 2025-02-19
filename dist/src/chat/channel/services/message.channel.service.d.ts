import { ConfigService } from "@nestjs/config";
import { RoomMemberService } from "../../room_member/room_member.service";
import { MessageService } from "../../message/message.service";
import { UserService } from "../../../api/user_modules/user/user.service";
import { UserBanService } from "../../../api/user_modules/user_ban/user_ban.service";
import { GroupSettingsService } from "../../group_settings/group_settings.service";
import { BroadcastSettingsService } from "../../broadcast_settings/broadcast_settings.service";
import { GroupMemberService } from "../../group_member/group_member.service";
import { BroadcastMemberService } from "../../broadcast_member/broadcast_member.service";
import { SocketIoService } from "../../socket_io/socket_io.service";
import { RoomMiddlewareService } from "../../room_middleware/room_middleware.service";
import { FileUploaderService } from "../../../common/file_uploader/file_uploader.service";
import { SendMessageDto } from "../dto/send.message.dto";
import { GroupMessageStatusService } from "../../group_message_status/group_message_status.service";
import { AppConfigService } from "../../../api/app_config/app_config.service";
import { IMessage } from "../../message/entities/message.entity";
import { DeleteMessageDto } from "../dto/delete.message.dto";
import { MessagesSearchDto } from "../../message/dto/messages_search_dto";
import { NotificationEmitterChannelService } from "./notification_emitter_channel.service";
import { RoomIdAndMsgIdDto } from "../../../core/common/dto/room.id.and.msg.id.dto";
import { MongoRoomIdDto } from "../../../core/common/dto/mongo.room.id.dto";
export declare class MessageChannelService {
    private readonly roomMemberService;
    private readonly messageService;
    private readonly userService;
    private readonly s3;
    private readonly config;
    private readonly socket;
    private readonly middlewareService;
    private readonly notificationService;
    private readonly appConfig;
    private readonly groupMember;
    private readonly broadcastMember;
    private readonly groupSetting;
    private readonly broadcastSetting;
    private readonly groupMessageStatusService;
    private readonly userBan;
    constructor(roomMemberService: RoomMemberService, messageService: MessageService, userService: UserService, s3: FileUploaderService, config: ConfigService, socket: SocketIoService, middlewareService: RoomMiddlewareService, notificationService: NotificationEmitterChannelService, appConfig: AppConfigService, groupMember: GroupMemberService, broadcastMember: BroadcastMemberService, groupSetting: GroupSettingsService, broadcastSetting: BroadcastSettingsService, groupMessageStatusService: GroupMessageStatusService, userBan: UserBanService);
    createMessage(dto: SendMessageDto, isSilent?: boolean): Promise<IMessage>;
    deleteRoomMessage(dto: DeleteMessageDto): Promise<"Message has been deleted from you" | "Message has been deleted from all">;
    getRoomMessages(myId: string, roomId: string, dto: MessagesSearchDto): Promise<{
        docs: any[];
    }>;
    private sha256FromBuffer;
    private getMessageAttachment;
    private getForwardMessageNewDto;
    private saveBroadcastMessages;
    private _getImageData;
    private _createStatusForGroupChat;
    starRoomMessage(dto: RoomIdAndMsgIdDto): Promise<string>;
    unStarRoomMessage(dto: RoomIdAndMsgIdDto): Promise<string>;
    getMyAllStarMessages(dto: MongoRoomIdDto): Promise<{
        docs: (import("mongoose").Document<unknown, {}, IMessage> & IMessage & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    oneSeeThisMessage(dto: RoomIdAndMsgIdDto): Promise<"You the sender" | "Msg updated">;
}
