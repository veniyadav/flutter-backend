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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelController = void 0;
const common_1 = require("@nestjs/common");
const admin_panel_service_1 = require("./admin_panel.service");
const v1_controller_decorator_1 = require("../../core/common/v1-controller.decorator");
const is_admin_or_super_guard_1 = require("../../core/guards/is.admin.or.super.guard");
const update_config_dto_1 = require("./dto/update_config_dto");
const res_helpers_1 = require("../../core/utils/res.helpers");
const mongo_id_dto_1 = require("../../core/common/dto/mongo.id.dto");
const admin_dto_1 = require("./dto/admin_dto");
const create_admin_notification_dto_1 = require("../admin_notification/dto/create-admin_notification.dto");
const mongo_room_id_dto_1 = require("../../core/common/dto/mongo.room.id.dto");
const upload_interceptors_1 = require("../../core/utils/upload_interceptors");
let AdminPanelController = class AdminPanelController {
    constructor(adminPanelService) {
        this.adminPanelService = adminPanelService;
    }
    async updateConfig(req, dto) {
        if (req['isViewer']) {
            return (0, res_helpers_1.resOK)("YOU ARE VIEWER !!!");
        }
        return (0, res_helpers_1.resOK)(await this.adminPanelService.updateConfig(dto));
    }
    async getConfig(req) {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.getAppConfig());
    }
    async setNewVersion(req, dto) {
        if (req['isViewer']) {
            return (0, res_helpers_1.resOK)("YOU ARE VIEWER !!!");
        }
        return (0, res_helpers_1.resOK)(await this.adminPanelService.setNewVersion(dto));
    }
    async createNotifications(req, dto, file) {
        if (req['isViewer']) {
            return (0, res_helpers_1.resOK)("YOU ARE VIEWER !!!");
        }
        if (file) {
            dto.imageBuffer = file.buffer;
        }
        return (0, res_helpers_1.resOK)(await this.adminPanelService.createNotification(dto));
    }
    async getNotifications() {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.getNotification());
    }
    async getUsersLog() {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.getUsersLog());
    }
    async getVersionDashboard(platform) {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.getVersions(platform));
    }
    async deleteVersion(req, id) {
        if (req['isViewer']) {
            return (0, res_helpers_1.resOK)("YOU ARE VIEWER !!!");
        }
        return (0, res_helpers_1.resOK)(await this.adminPanelService.deleteVersion(id));
    }
    async getCountryInfo() {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.getCountriesInfo());
    }
    async getUserInfo(dto) {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.getUserInfo(dto));
    }
    async getUserChats(dto, filter) {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.getUserChats(dto.id, filter));
    }
    async getUserChatsMessages(roomIdDto, filter, userId) {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.getUserChatsMessages(userId.id, roomIdDto.roomId, filter));
    }
    async updateUserInfo(req, dto, body) {
        if (req['isViewer']) {
            return (0, res_helpers_1.resOK)("YOU ARE VIEWER !!!");
        }
        return (0, res_helpers_1.resOK)(await this.adminPanelService.updateUserInfo(dto.id, body));
    }
    async getUsers(dto) {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.getUsers(dto));
    }
    async login(req) {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.login(req['isViewer']));
    }
    async getDashboard() {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.getDashboard());
    }
    async getUserReports(filter) {
        return (0, res_helpers_1.resOK)(await this.adminPanelService.getUserReports(filter));
    }
    async deleteReport(req, dto) {
        if (req['isViewer']) {
            return (0, res_helpers_1.resOK)("YOU ARE VIEWER !!!");
        }
        return (0, res_helpers_1.resOK)(await this.adminPanelService.deleteReport(dto.id));
    }
};
__decorate([
    (0, common_1.Patch)("/config"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_config_dto_1.UpdateConfigDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "updateConfig", null);
__decorate([
    (0, common_1.Get)("/config"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "getConfig", null);
__decorate([
    (0, common_1.Patch)("/versions"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, admin_dto_1.CreateNewVersionDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "setNewVersion", null);
__decorate([
    (0, common_1.Post)("/notifications"),
    (0, common_1.UseInterceptors)(upload_interceptors_1.imageFileInterceptor),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_admin_notification_dto_1.CreateAdminNotificationDto, Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "createNotifications", null);
__decorate([
    (0, common_1.Get)("/notifications"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Get)("/users/log"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "getUsersLog", null);
__decorate([
    (0, common_1.Get)("/versions/:platform"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.GetVersionDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "getVersionDashboard", null);
__decorate([
    (0, common_1.Delete)("/versions/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_id_dto_1.MongoIdDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "deleteVersion", null);
__decorate([
    (0, common_1.Get)("/countries"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "getCountryInfo", null);
__decorate([
    (0, common_1.Get)("/user/info/:id"),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_id_dto_1.MongoIdDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "getUserInfo", null);
__decorate([
    (0, common_1.Get)("/user/info/:id/chats"),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_id_dto_1.MongoIdDto, Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "getUserChats", null);
__decorate([
    (0, common_1.Get)("/user/info/:id/chats/:roomId"),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_room_id_dto_1.MongoRoomIdDto,
        Object,
        mongo_id_dto_1.MongoIdDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "getUserChatsMessages", null);
__decorate([
    (0, common_1.Patch)("/user/info/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_id_dto_1.MongoIdDto, Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "updateUserInfo", null);
__decorate([
    (0, common_1.Get)("/users"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Post)("/login"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "login", null);
__decorate([
    (0, common_1.Get)("/dashboard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)("/users/reports"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "getUserReports", null);
__decorate([
    (0, common_1.Delete)("/users/reports/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_id_dto_1.MongoIdDto]),
    __metadata("design:returntype", Promise)
], AdminPanelController.prototype, "deleteReport", null);
AdminPanelController = __decorate([
    (0, common_1.UseGuards)(is_admin_or_super_guard_1.IsSuperAdminGuard),
    (0, v1_controller_decorator_1.V1Controller)("admin-panel"),
    __metadata("design:paramtypes", [admin_panel_service_1.AdminPanelService])
], AdminPanelController);
exports.AdminPanelController = AdminPanelController;
//# sourceMappingURL=admin_panel.controller.js.map