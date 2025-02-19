"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelService = void 0;
const common_1 = require("@nestjs/common");
const app_config_service_1 = require("../app_config/app_config.service");
const user_service_1 = require("../user_modules/user/user.service");
const file_uploader_service_1 = require("../../common/file_uploader/file_uploader.service");
const config_1 = require("@nestjs/config");
const user_device_service_1 = require("../user_modules/user_device/user_device.service");
const utils_1 = require("../../core/utils/utils");
const user_admin_service_1 = require("./other/user_admin.service");
const user_country_admin_service_1 = require("./other/user_country_admin.service");
const versions_admin_service_1 = require("./other/versions_admin.service");
const user_device_admin_service_1 = require("./other/user_device_admin.service");
const socket_io_service_1 = require("../../chat/socket_io/socket_io.service");
const channel_admin_service_1 = require("./other/channel_admin_service");
const channel_service_1 = require("../../chat/channel/services/channel.service");
const message_service_1 = require("../../chat/message/message.service");
const messages_search_dto_1 = require("../../chat/message/dto/messages_search_dto");
const report_system_service_1 = require("../report_system/report_system.service");
const mongoose_paginate_v2_1 = require("mongoose-paginate-v2");
const enums_1 = require("../../core/utils/enums");
const admin_notification_service_1 = require("../admin_notification/admin_notification.service");
const notification_emitter_admin_service_1 = require("./other/notification_emitter_admin.service");
let AdminPanelService = class AdminPanelService {
    constructor(appConfigService, userService, socket, fileUploaderService, versionsAdminService, configService, userDeviceService, userDeviceAdminService, countryAdminService, userAdminService, channelAdminService, channelService, messageService, reportSystemService, emitterAdminService, adminNotificationService, uploaderService) {
        this.appConfigService = appConfigService;
        this.userService = userService;
        this.socket = socket;
        this.fileUploaderService = fileUploaderService;
        this.versionsAdminService = versionsAdminService;
        this.configService = configService;
        this.userDeviceService = userDeviceService;
        this.userDeviceAdminService = userDeviceAdminService;
        this.countryAdminService = countryAdminService;
        this.userAdminService = userAdminService;
        this.channelAdminService = channelAdminService;
        this.channelService = channelService;
        this.messageService = messageService;
        this.reportSystemService = reportSystemService;
        this.emitterAdminService = emitterAdminService;
        this.adminNotificationService = adminNotificationService;
        this.uploaderService = uploaderService;
    }
    async updateConfig(dto) {
        let config = await this.appConfigService.getConfig();
        if (!config)
            throw new Error("Config not found");
        return await this.appConfigService.insert({
            ...config,
            ...dto,
            _id: (0, utils_1.newMongoObjId)().toString()
        });
    }
    async getAppConfig() {
        return this.appConfigService.getConfig();
    }
    async setNewVersion(dto) {
        return this.versionsAdminService.setNewVersion(dto);
    }
    async getVersions(platform) {
        return this.versionsAdminService.getVersions(platform);
    }
    async deleteVersion(id) {
        return this.versionsAdminService.deleteVersion(id);
    }
    async createNotification(dto) {
        if (dto.imageBuffer) {
            dto.imageUrl = await this.uploaderService.putImageCropped(dto.imageBuffer, "admin");
        }
        await this.adminNotificationService.create(dto);
        await this.emitterAdminService.emitNotification(dto);
        return "Done";
    }
    async getUserInfo(dto) {
        let isOnline = await this.socket.getOnlineFromList([dto.id]);
        let data = await this.countryAdminService.getUserCountries(dto.id);
        let userCountries = [];
        for (let i of data) {
            try {
                userCountries.push(i["data"][0]);
            }
            catch (err) {
                console.log("Error while get userCountryService getCountriesInfo for loop!");
            }
        }
        return {
            "userInfo": {
                ...(await this.userService.findById(dto.id, null, {
                    populate: "countryId"
                })),
                "isOnline": isOnline.length > 0
            },
            "visits": await this.userDeviceAdminService.getUserVisits(dto.id),
            "userDevices": await this.userDeviceService.findAll({
                uId: dto.id
            }),
            "userCountries": userCountries,
            "userReports": await this.reportSystemService.findAll({
                targetId: dto.id,
                isDeleted: false
            }, null, {
                populate: {
                    path: "uId",
                    select: "fullName verifiedAt userImage registerStatus banTo lastSeenAt bio"
                },
                limit: 30,
            }),
            "chats": {
                "messagesCounter": await this.channelAdminService.getMessagesCounterForPeer(dto.id),
                "roomCounter": await this.channelAdminService.getRoomCounterForPeer(dto.id)
            }
        };
    }
    async getUsers(dto) {
        return this.userAdminService.getUsers(dto);
    }
    async getUsersDashboardInfo() {
        return {
            "usersData": await this.userAdminService.getUsersData(),
            "usersDevices": await this.userDeviceAdminService.getUsersDevicesInfo(),
            "statistics": {
                "visits": await this.userDeviceAdminService.getTotalVisits(),
                "iosVisits": await this.userDeviceAdminService.getPlatformVisits(enums_1.Platform.Ios),
                "androidVisits": await this.userDeviceAdminService.getPlatformVisits(enums_1.Platform.Android),
                "webVisits": await this.userDeviceAdminService.getPlatformVisits(enums_1.Platform.Web),
                "otherVisits": await this.userDeviceAdminService.getPlatformVisits(enums_1.Platform.Other),
            },
            "usersCountries": await this.countryAdminService.getCountriesInfo()
        };
    }
    async getNotification() {
        return this.adminNotificationService.findAll({}, null, { sort: "-_id" });
    }
    async getUserChats(peerId, filter) {
        return this.channelService.getRoomsLimited(filter, peerId);
    }
    async getCountriesInfo() {
        return this.countryAdminService.getCountriesInfo();
    }
    async getChatDashboardInfo() {
        return {
            "messagesCounter": await this.channelAdminService.getMessagesCounter(),
            "roomCounter": await this.channelAdminService.getRoomCounter()
        };
    }
    async updateUserInfo(id, body) {
        let user = await this.userService.findByIdOrThrow(id);
        if (body['hasBadge'] == true) {
            body['roles'] = [...user.roles, enums_1.UserRole.HasBadge];
        }
        if (body['hasBadge'] == false) {
            body['roles'] = [...user.roles];
            body['roles'] = body['roles'].filter((item) => item !== enums_1.UserRole.HasBadge);
        }
        await this.userAdminService.updateUserData(id, body);
        return "Done";
    }
    async getUserChatsMessages(userId, roomId, filter) {
        let dto = new messages_search_dto_1.MessagesSearchDto();
        dto.lastId = filter['lastId'];
        dto.limit = filter['limit'];
        return this.messageService.findAllMessagesAggregation((0, utils_1.newMongoObjId)(userId), (0, utils_1.newMongoObjId)(roomId), dto);
    }
    async getUserReports(dto) {
        let paginationParameters = new mongoose_paginate_v2_1.PaginationParameters({
            query: {
                limit: 50,
                page: 1,
                sort: "-_id",
                ...dto,
                populate: [
                    {
                        path: 'uId',
                        select: "fullName verifiedAt userImage registerStatus banTo lastSeenAt bio"
                    },
                    {
                        path: 'targetId',
                        select: "fullName verifiedAt userImage registerStatus banTo lastSeenAt bio"
                    }
                ]
            },
        }).get();
        delete dto['limit'];
        delete dto['page'];
        paginationParameters[0] = dto;
        return this.reportSystemService.paginate(paginationParameters);
    }
    async deleteReport(id) {
        await this.reportSystemService.findByIdAndDelete(id);
        return "Done";
    }
    async getUsersLog() {
        return this.userAdminService.getUsersLog();
    }
    async login(x) {
        return {
            isViewer: x
        };
    }
    async getDashboard() {
        return {
            ...await this.getUsersDashboardInfo(),
            ...await this.getChatDashboardInfo(),
        };
    }
};
AdminPanelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [app_config_service_1.AppConfigService,
        user_service_1.UserService,
        socket_io_service_1.SocketIoService,
        file_uploader_service_1.FileUploaderService,
        versions_admin_service_1.VersionsAdminService,
        config_1.ConfigService,
        user_device_service_1.UserDeviceService,
        user_device_admin_service_1.UserDeviceAdminService,
        user_country_admin_service_1.UserCountryAdminService,
        user_admin_service_1.UserAdminService,
        channel_admin_service_1.ChannelAdminService,
        channel_service_1.ChannelService,
        message_service_1.MessageService,
        report_system_service_1.ReportSystemService,
        notification_emitter_admin_service_1.NotificationEmitterAdminService,
        admin_notification_service_1.AdminNotificationService,
        file_uploader_service_1.FileUploaderService])
], AdminPanelService);
exports.AdminPanelService = AdminPanelService;
//# sourceMappingURL=admin_panel.service.js.map