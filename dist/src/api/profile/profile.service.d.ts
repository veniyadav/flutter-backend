/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-paginate-v2" />
/// <reference types="mongoose-aggregate-paginate-v2" />
import { UserService } from "../user_modules/user/user.service";
import { UserDeviceService } from "../user_modules/user_device/user_device.service";
import { UserBanService } from "../user_modules/user_ban/user_ban.service";
import { IUser } from "../user_modules/user/entities/user.entity";
import { VersionsService } from "../versions/versions.service";
import { FileUploaderService } from "../../common/file_uploader/file_uploader.service";
import { MongoIdDto } from "../../core/common/dto/mongo.id.dto";
import UpdatePasswordDto from "./dto/update_password_dto";
import CheckVersionDto from "./dto/check-version.dto";
import { UpdateChatReqStatusDto, UpdateMyBioDto, UpdateMyNameDto, UpdateMyPasswordDto, UpdateMyPrivacyDto } from "./dto/update.my.name.dto";
import { AppConfigService } from "../app_config/app_config.service";
import { MongoPeerIdDto } from "../../core/common/dto/mongo.peer.id.dto";
import { RoomMemberService } from "../../chat/room_member/room_member.service";
import { GroupMemberService } from "../../chat/group_member/group_member.service";
import { BroadcastMemberService } from "../../chat/broadcast_member/broadcast_member.service";
import { UserVersionService } from "../user_modules/user_version/user_version.service";
import { CreateReportSystemDto } from "../report_system/dto/create-report_system.dto";
import { ReportSystemService } from "../report_system/report_system.service";
import { AdminNotificationService } from "../admin_notification/admin_notification.service";
import { SocketIoService } from "../../chat/socket_io/socket_io.service";
import { AuthService } from "../auth/auth.service";
import { NotificationEmitterService } from "../../common/notification_emitter/notification_emitter.service";
import { Platform } from "../../core/utils/enums";
import { ChatRequestService } from "../../chat/chat_request/chat_request.service";
import { ChannelService } from "../../chat/channel/services/channel.service";
import { ProfileNotificationEmitter } from "./profile_notification_emitter";
export declare class ProfileService {
    private readonly userService;
    private readonly userDevice;
    private readonly authService;
    private readonly banServer;
    private readonly ioService;
    private s3;
    private notificationEmitterService;
    private versionsService;
    private appConfigService;
    private reportSystemService;
    private readonly roomMemberService;
    private readonly groupMember;
    private readonly userVersion;
    private readonly broadcastMember;
    private readonly adminNotificationService;
    private readonly chatRequestService;
    private readonly channelService;
    private readonly profileNotificationEmitter;
    constructor(userService: UserService, userDevice: UserDeviceService, authService: AuthService, banServer: UserBanService, ioService: SocketIoService, s3: FileUploaderService, notificationEmitterService: NotificationEmitterService, versionsService: VersionsService, appConfigService: AppConfigService, reportSystemService: ReportSystemService, roomMemberService: RoomMemberService, groupMember: GroupMemberService, userVersion: UserVersionService, broadcastMember: BroadcastMemberService, adminNotificationService: AdminNotificationService, chatRequestService: ChatRequestService, channelService: ChannelService, profileNotificationEmitter: ProfileNotificationEmitter);
    getMyProfile(user: IUser): Promise<{}>;
    getPeerProfile(dto: MongoIdDto): Promise<{}>;
    updateMyName(dto: UpdateMyNameDto): Promise<string>;
    updateMyImage(file: any, myUser: IUser): Promise<string>;
    deleteFcmFor(user: IUser): Promise<string>;
    addPushKey(myUser: IUser, pushKey?: string, voipKey?: string): Promise<string>;
    updateLanguage(myUser: IUser, language: String): Promise<string>;
    updatePassword(user: IUser, dto: UpdatePasswordDto): Promise<string>;
    updateFcm(user: IUser, pushKey: String): Promise<string>;
    getUsersAndSearch(dto: Object, myUser: IUser): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, IUser> & IUser & Required<{
        _id: string;
    }>>>;
    setVisit(user: IUser): Promise<string>;
    getMyDevices(user: any): Promise<(import("mongoose").Document<unknown, {}, import("../user_modules/user_device/entities/user_device.entity").IUserDevice> & import("../user_modules/user_device/entities/user_device.entity").IUserDevice & Required<{
        _id: string;
    }>)[]>;
    getAppConfig(user: any): Promise<import("../app_config/entities/app_config.entity").IAppConfig>;
    getUserLastSeenAt(dto: MongoPeerIdDto): Promise<Date>;
    deleteMyAccount(user: IUser, password: string): Promise<string>;
    checkVersion(dto: CheckVersionDto): Promise<{
        isNeedUpdates: boolean;
        isCritical: boolean;
        clientVersion: string;
        notes: string;
        serverVersion: string;
        platform: Platform;
    }>;
    createReport(dto: CreateReportSystemDto): Promise<any>;
    getAdminNotification(dto: Object): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, import("../admin_notification/entities/admin_notification.entity").IAdminNotification> & import("../admin_notification/entities/admin_notification.entity").IAdminNotification & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
    updateMyBio(dto: UpdateMyBioDto): Promise<string>;
    updateMyPassword(dto: UpdateMyPasswordDto): Promise<string>;
    deleteDevice(dto: MongoIdDto, password: string): Promise<string>;
    getMyBlocked(user: IUser, dto: Object): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, import("../ban/entities/ban.entity").IBan> & import("../ban/entities/ban.entity").IBan & Required<{
        _id: string;
    }>>>;
    checkPassword(user: IUser, password: string): Promise<boolean>;
    comparePassword(dtoPassword: any, dbHasPassword: any): Promise<boolean>;
    updateMyPrivacy(dto: UpdateMyPrivacyDto): Promise<IUser>;
    sendChatRequest(dto: MongoIdDto): Promise<string>;
    updateChatRequest(dto: MongoIdDto, status: UpdateChatReqStatusDto): Promise<string>;
    getMyChatRequest(user: IUser, dto: object): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, import("../../chat/chat_request/entities/chat.request.entity").IChatRequest> & import("../../chat/chat_request/entities/chat.request.entity").IChatRequest & Required<{
        _id: string;
    }>>>;
}
