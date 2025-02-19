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
import { UpdateConfigDto } from "./dto/update_config_dto";
import { AppConfigService } from "../app_config/app_config.service";
import { UserService } from "../user_modules/user/user.service";
import { FileUploaderService } from "../../common/file_uploader/file_uploader.service";
import { ConfigService } from "@nestjs/config";
import { UserDeviceService } from "../user_modules/user_device/user_device.service";
import { MongoIdDto } from "../../core/common/dto/mongo.id.dto";
import { CreateNewVersionDto, GetVersionDto } from "./dto/admin_dto";
import { CreateAdminNotificationDto } from "../admin_notification/dto/create-admin_notification.dto";
import { UserAdminService } from "./other/user_admin.service";
import { UserCountryAdminService } from "./other/user_country_admin.service";
import { VersionsAdminService } from "./other/versions_admin.service";
import { UserDeviceAdminService } from "./other/user_device_admin.service";
import { SocketIoService } from "../../chat/socket_io/socket_io.service";
import { ChannelAdminService } from "./other/channel_admin_service";
import { ChannelService } from "../../chat/channel/services/channel.service";
import { MessageService } from "../../chat/message/message.service";
import { ReportSystemService } from "../report_system/report_system.service";
import { UserRole } from "../../core/utils/enums";
import { AdminNotificationService } from "../admin_notification/admin_notification.service";
import { NotificationEmitterAdminService } from "./other/notification_emitter_admin.service";
export declare class AdminPanelService {
    private readonly appConfigService;
    private readonly userService;
    private readonly socket;
    private readonly fileUploaderService;
    private readonly versionsAdminService;
    private readonly configService;
    private readonly userDeviceService;
    private readonly userDeviceAdminService;
    private readonly countryAdminService;
    private readonly userAdminService;
    private readonly channelAdminService;
    private readonly channelService;
    private readonly messageService;
    private reportSystemService;
    private emitterAdminService;
    private adminNotificationService;
    private readonly uploaderService;
    constructor(appConfigService: AppConfigService, userService: UserService, socket: SocketIoService, fileUploaderService: FileUploaderService, versionsAdminService: VersionsAdminService, configService: ConfigService, userDeviceService: UserDeviceService, userDeviceAdminService: UserDeviceAdminService, countryAdminService: UserCountryAdminService, userAdminService: UserAdminService, channelAdminService: ChannelAdminService, channelService: ChannelService, messageService: MessageService, reportSystemService: ReportSystemService, emitterAdminService: NotificationEmitterAdminService, adminNotificationService: AdminNotificationService, uploaderService: FileUploaderService);
    updateConfig(dto: UpdateConfigDto): Promise<import("mongoose").Document<unknown, {}, import("../app_config/entities/app_config.entity").IAppConfig> & import("../app_config/entities/app_config.entity").IAppConfig & Required<{
        _id: string;
    }>>;
    getAppConfig(): Promise<import("../app_config/entities/app_config.entity").IAppConfig>;
    setNewVersion(dto: CreateNewVersionDto): Promise<string>;
    getVersions(platform: GetVersionDto): Promise<(import("mongoose").Document<unknown, {}, import("../versions/versions.entity").IVersion> & import("../versions/versions.entity").IVersion & Required<{
        _id: string;
    }>)[]>;
    deleteVersion(id: MongoIdDto): Promise<string>;
    createNotification(dto: CreateAdminNotificationDto): Promise<string>;
    getUserInfo(dto: MongoIdDto): Promise<{
        userInfo: {
            isOnline: boolean;
            _id: string;
            email: string;
            fullName: string;
            fullNameEn: string;
            password: string;
            uniqueCode: number;
            bio?: string;
            lastMail: {
                type: import("../../core/utils/enums").MailType;
                sendAt: Date;
                code: number;
                expired: boolean;
            };
            banTo?: Date;
            verifiedAt?: Date;
            registerStatus: import("../../core/utils/enums").RegisterStatus;
            registerMethod: import("../../core/utils/enums").RegisterMethod;
            userImage: string;
            createdAt: Date;
            deletedAt?: Date;
            countryId?: string;
            updatedAt: Date;
            lastSeenAt: Date;
            roles: UserRole[];
            userPrivacy: import("../user_modules/user/entities/user.entity").UserPrivacy;
            currentDevice: import("../user_modules/user_device/entities/user_device.entity").IUserDevice;
            userGlobalCallStatus?: import("../../chat/call_modules/utils/user-global-call-status.model").UserGlobalCallStatus;
        };
        visits: any;
        userDevices: (import("mongoose").Document<unknown, {}, import("../user_modules/user_device/entities/user_device.entity").IUserDevice> & import("../user_modules/user_device/entities/user_device.entity").IUserDevice & Required<{
            _id: string;
        }>)[];
        userCountries: any[];
        userReports: (import("mongoose").Document<unknown, {}, import("../report_system/entities/report_system.entity").IReport> & import("../report_system/entities/report_system.entity").IReport & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        chats: {
            messagesCounter: {
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
            };
            roomCounter: {
                single: number;
                order: number;
                group: number;
                broadcast: number;
                total: number;
            };
        };
    }>;
    getUsers(dto: Object): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, import("../user_modules/user/entities/user.entity").IUser> & import("../user_modules/user/entities/user.entity").IUser & Required<{
        _id: string;
    }>>>;
    getUsersDashboardInfo(): Promise<{
        usersData: {
            totalUsersCount: number;
            deleted: number;
            banned: number;
            allVerifiedUsersCount: number;
            userStatusCounter: {
                accepted: number;
                pending: number;
                notAccepted: number;
            };
            online: number;
        };
        usersDevices: {
            all: number;
            web: number;
            ios: number;
            mac: number;
            windows: number;
            linux: number;
            android: number;
            other: number;
        };
        statistics: {
            visits: any;
            iosVisits: any;
            androidVisits: any;
            webVisits: any;
            otherVisits: any;
        };
        usersCountries: any[];
    }>;
    getNotification(): Promise<(import("mongoose").Document<unknown, {}, import("../admin_notification/entities/admin_notification.entity").IAdminNotification> & import("../admin_notification/entities/admin_notification.entity").IAdminNotification & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getUserChats(peerId: string, filter: object): Promise<any>;
    getCountriesInfo(): Promise<any[]>;
    getChatDashboardInfo(): Promise<{
        messagesCounter: {
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
        };
        roomCounter: {
            single: number;
            order: number;
            group: number;
            broadcast: number;
            total: number;
        };
    }>;
    updateUserInfo(id: string, body: object): Promise<string>;
    getUserChatsMessages(userId: string, roomId: string, filter: object): Promise<any[]>;
    getUserReports(dto: object): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, import("../report_system/entities/report_system.entity").IReport> & import("../report_system/entities/report_system.entity").IReport & {
        _id: import("mongoose").Types.ObjectId;
    }>>;
    deleteReport(id: string): Promise<string>;
    getUsersLog(): Promise<any[]>;
    login(x: any): Promise<{
        isViewer: any;
    }>;
    getDashboard(): Promise<{
        messagesCounter: {
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
        };
        roomCounter: {
            single: number;
            order: number;
            group: number;
            broadcast: number;
            total: number;
        };
        usersData: {
            totalUsersCount: number;
            deleted: number;
            banned: number;
            allVerifiedUsersCount: number;
            userStatusCounter: {
                accepted: number;
                pending: number;
                notAccepted: number;
            };
            online: number;
        };
        usersDevices: {
            all: number;
            web: number;
            ios: number;
            mac: number;
            windows: number;
            linux: number;
            android: number;
            other: number;
        };
        statistics: {
            visits: any;
            iosVisits: any;
            androidVisits: any;
            webVisits: any;
            otherVisits: any;
        };
        usersCountries: any[];
    }>;
}
