import { AdminPanelService } from "./admin_panel.service";
import { UpdateConfigDto } from "./dto/update_config_dto";
import { MongoIdDto } from "../../core/common/dto/mongo.id.dto";
import { CreateNewVersionDto, GetVersionDto } from "./dto/admin_dto";
import { CreateAdminNotificationDto } from "../admin_notification/dto/create-admin_notification.dto";
import { MongoRoomIdDto } from "../../core/common/dto/mongo.room.id.dto";
export declare class AdminPanelController {
    private readonly adminPanelService;
    constructor(adminPanelService: AdminPanelService);
    updateConfig(req: any, dto: UpdateConfigDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getConfig(req: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    setNewVersion(req: any, dto: CreateNewVersionDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    createNotifications(req: any, dto: CreateAdminNotificationDto, file?: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getNotifications(): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getUsersLog(): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getVersionDashboard(platform: GetVersionDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    deleteVersion(req: any, id: MongoIdDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getCountryInfo(): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getUserInfo(dto: MongoIdDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getUserChats(dto: MongoIdDto, filter: Object): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getUserChatsMessages(roomIdDto: MongoRoomIdDto, filter: Object, userId: MongoIdDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateUserInfo(req: any, dto: MongoIdDto, body: object): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getUsers(dto: Object): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    login(req: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getDashboard(): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getUserReports(filter: Object): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    deleteReport(req: any, dto: MongoIdDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
}
