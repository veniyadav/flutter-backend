import { ChannelService } from "./channel.service";
import { ConfigService } from "@nestjs/config";
import { KickMembersDto } from "../dto/kick.members.dto";
import { CreateBroadcastRoomDto } from "../dto/create-broadcast-room.dto";
import mongoose from "mongoose";
import { SocketIoService } from "../../socket_io/socket_io.service";
import { RoomMemberService } from "../../room_member/room_member.service";
import { MessageService } from "../../message/message.service";
import { UserService } from "../../../api/user_modules/user/user.service";
import { UserBanService } from "../../../api/user_modules/user_ban/user_ban.service";
import { SingleRoomSettingsService } from "../../single_room_settings/single_room_settings.service";
import { BroadcastSettingsService } from "../../broadcast_settings/broadcast_settings.service";
import { BroadcastMemberService } from "../../broadcast_member/broadcast_member.service";
import { RoomMiddlewareService } from "../../room_middleware/room_middleware.service";
import { FileUploaderService } from "../../../common/file_uploader/file_uploader.service";
import { IUser } from "../../../api/user_modules/user/entities/user.entity";
import { MongoRoomIdDto } from "../../../core/common/dto/mongo.room.id.dto";
import { AppConfigService } from "../../../api/app_config/app_config.service";
import { IBroadcastMember } from "../../broadcast_member/entities/broadcast_member.entity";
import { MongoIdsDto } from "../../../core/common/dto/mongo.ids.dto";
import { UsersSearchDto } from "../dto/users_search_dto";
import { IBroadcastSetting } from "../../broadcast_settings/entities/broadcast_setting.entity";
import { MessageStatusParamDto } from "../dto/message_status_param_dto";
import { DefaultPaginateParams } from "../../../core/common/dto/paginateDto";
import { NotificationEmitterChannelService } from "./notification_emitter_channel.service";
export declare class BroadcastChannelService {
    private readonly channelService;
    private readonly roomMemberService;
    private readonly singleRoomSetting;
    private readonly messageService;
    private readonly userService;
    private readonly s3;
    private readonly config;
    private readonly socketIoService;
    private readonly middlewareService;
    private readonly broadcastSetting;
    private readonly broadcastMember;
    private readonly notificationService;
    private readonly appConfig;
    private readonly userBan;
    constructor(channelService: ChannelService, roomMemberService: RoomMemberService, singleRoomSetting: SingleRoomSettingsService, messageService: MessageService, userService: UserService, s3: FileUploaderService, config: ConfigService, socketIoService: SocketIoService, middlewareService: RoomMiddlewareService, broadcastSetting: BroadcastSettingsService, broadcastMember: BroadcastMemberService, notificationService: NotificationEmitterChannelService, appConfig: AppConfigService, userBan: UserBanService);
    createBroadcastChat(dto: CreateBroadcastRoomDto, session?: mongoose.ClientSession): Promise<any>;
    addMembersToBroadcast(bId: string, dto: MongoIdsDto, session?: mongoose.ClientSession): Promise<string>;
    kickBroadcastMember(dto: KickMembersDto): Promise<string>;
    getBroadcastMembers(myUser: IUser, dto: UsersSearchDto, roomId: string): Promise<mongoose.PaginateResult<mongoose.Document<unknown, mongoose.PaginateOptions, IBroadcastMember> & IBroadcastMember & Required<{
        _id: string;
    }>>>;
    updateTitle(dto: MongoRoomIdDto, title: string): Promise<string>;
    updateImage(dto: MongoRoomIdDto, file: any): Promise<string>;
    getBroadcastMyInfo(dto: MongoRoomIdDto): Promise<{
        totalUsers: number;
        broadcastSettings: IBroadcastSetting;
    }>;
    getBroadcastMessageInfo(dto: MessageStatusParamDto, x: DefaultPaginateParams): Promise<mongoose.PaginateResult<mongoose.Document<unknown, mongoose.PaginateOptions, import("../../message/entities/message.entity").IMessage> & import("../../message/entities/message.entity").IMessage & {
        _id: mongoose.Types.ObjectId;
    }>>;
    private _createPeerRoom;
    getAvailableUsersToAdd(dto: Object, roomId: string, myId: any): Promise<mongoose.PaginateResult<mongoose.Document<unknown, mongoose.PaginateOptions, IUser> & IUser & Required<{
        _id: string;
    }>>>;
}
