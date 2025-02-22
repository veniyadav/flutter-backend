import { ChannelService } from "./channel.service";
import { ConfigService } from "@nestjs/config";
import { CreateGroupRoomDto } from "../dto/create-group-room.dto";
import { UpdateRoleDto } from "../dto/update.role.dto";
import { KickMembersDto } from "../dto/kick.members.dto";
import { SocketIoService } from "../../socket_io/socket_io.service";
import * as mongoose from "mongoose";
import { RoomMemberService } from "../../room_member/room_member.service";
import { MessageService } from "../../message/message.service";
import { UserService } from "../../../api/user_modules/user/user.service";
import { UserBanService } from "../../../api/user_modules/user_ban/user_ban.service";
import { GroupSettingsService } from "../../group_settings/group_settings.service";
import { GroupMemberService } from "../../group_member/group_member.service";
import { RoomMiddlewareService } from "../../room_middleware/room_middleware.service";
import { FileUploaderService } from "../../../common/file_uploader/file_uploader.service";
import { IUser } from "../../../api/user_modules/user/entities/user.entity";
import { GroupRoleType } from "../../../core/utils/enums";
import { MongoRoomIdDto } from "../../../core/common/dto/mongo.room.id.dto";
import { IRoomMember } from "../../room_member/entities/room_member.entity";
import { GroupMessageStatusService } from "../../group_message_status/group_message_status.service";
import { MessageChannelService } from "./message.channel.service";
import { AppConfigService } from "../../../api/app_config/app_config.service";
import { IGroupMember } from "../../group_member/entities/group_member.entity";
import { MongoIdsDto } from "../../../core/common/dto/mongo.ids.dto";
import { UsersSearchDto } from "../dto/users_search_dto";
import { MessageStatusParamDto } from "../dto/message_status_param_dto";
import { DefaultPaginateParams } from "../../../core/common/dto/paginateDto";
import { IGroupSettings } from "../../group_settings/entities/group_setting.entity";
import { NotificationEmitterChannelService } from "./notification_emitter_channel.service";
export declare class GroupChannelService {
    private readonly channelService;
    private readonly roomMemberService;
    private readonly groupMessageStatusService;
    private readonly messageService;
    private readonly messageChannelService;
    private readonly userService;
    private readonly s3;
    private readonly config;
    private readonly socketIoService;
    private readonly middlewareService;
    private readonly notificationService;
    private readonly appConfig;
    private readonly groupMember;
    private readonly groupSetting;
    private readonly userBan;
    constructor(channelService: ChannelService, roomMemberService: RoomMemberService, groupMessageStatusService: GroupMessageStatusService, messageService: MessageService, messageChannelService: MessageChannelService, userService: UserService, s3: FileUploaderService, config: ConfigService, socketIoService: SocketIoService, middlewareService: RoomMiddlewareService, notificationService: NotificationEmitterChannelService, appConfig: AppConfigService, groupMember: GroupMemberService, groupSetting: GroupSettingsService, userBan: UserBanService);
    createGroupChat(dto: CreateGroupRoomDto, session?: mongoose.ClientSession): Promise<any>;
    addMembersToGroup(gId: string, dto: MongoIdsDto): Promise<string>;
    checkGroupAdminMember(gId: string, myId: string): Promise<IRoomMember>;
    changeGroupUserRole(dto: UpdateRoleDto): Promise<string>;
    kickGroupMember(dto: KickMembersDto): Promise<string>;
    getGroupMembers(myUser: IUser, dto: UsersSearchDto, roomId: string): Promise<mongoose.PaginateResult<mongoose.Document<unknown, mongoose.PaginateOptions, IGroupMember> & IGroupMember & {
        _id: mongoose.Types.ObjectId;
    }>>;
    leaveGroupChat(dto: MongoRoomIdDto): Promise<"You already left!" | "Group has been deleted" | "left successfully">;
    updateTitle(dto: MongoRoomIdDto, title: string): Promise<string>;
    updateImage(dto: MongoRoomIdDto, file: any): Promise<string>;
    getMyGroupInfo(dto: MongoRoomIdDto): Promise<{
        isMeOut: boolean;
        membersCount: number;
        myRole: GroupRoleType;
        groupSettings: IGroupSettings;
        totalOnline: number;
    }>;
    getMyGroupStatus(dto: MongoRoomIdDto): Promise<{
        isMeOut: boolean;
    }>;
    updateGroupExtraData(dto: MongoRoomIdDto, data: {}): Promise<string>;
    getGroupMessageInfo(dto: MessageStatusParamDto, x: DefaultPaginateParams): Promise<mongoose.PaginateResult<mongoose.Document<unknown, mongoose.PaginateOptions, import("../../group_message_status/entities/group_message_status.entity").IGroupMessageStatus> & import("../../group_message_status/entities/group_message_status.entity").IGroupMessageStatus & {
        _id: mongoose.Types.ObjectId;
    }>>;
    updateDescription(dto: MongoRoomIdDto, description: string): Promise<string>;
    private _changeUserRoleTo;
    getAvailableUsersToAdd(dto: Object, roomId: string, myId: string): Promise<mongoose.PaginateResult<mongoose.Document<unknown, mongoose.PaginateOptions, IUser> & IUser & Required<{
        _id: string;
    }>>>;
}
