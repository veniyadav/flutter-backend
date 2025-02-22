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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileController = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const update_my_name_dto_1 = require("./dto/update.my.name.dto");
const update_password_dto_1 = __importDefault(require("./dto/update_password_dto"));
const verified_auth_guard_1 = require("../../core/guards/verified.auth.guard");
const res_helpers_1 = require("../../core/utils/res.helpers");
const upload_interceptors_1 = require("../../core/utils/upload_interceptors");
const mongo_id_dto_1 = require("../../core/common/dto/mongo.id.dto");
const check_version_dto_1 = __importDefault(require("./dto/check-version.dto"));
const v1_controller_decorator_1 = require("../../core/common/v1-controller.decorator");
const mongo_peer_id_dto_1 = require("../../core/common/dto/mongo.peer.id.dto");
const create_report_system_dto_1 = require("../report_system/dto/create-report_system.dto");
let ProfileController = class ProfileController {
    constructor(profileService) {
        this.profileService = profileService;
    }
    async getMyProfile(req) {
        return (0, res_helpers_1.resOK)(await this.profileService.getMyProfile(req.user));
    }
    async getConfig(req) {
        return (0, res_helpers_1.resOK)(await this.profileService.getAppConfig(req.user));
    }
    async getUsersAndSearch(req, dto) {
        return (0, res_helpers_1.resOK)(await this.profileService.getUsersAndSearch(dto, req.user));
    }
    async getAdminNotification(req, dto) {
        return (0, res_helpers_1.resOK)(await this.profileService.getAdminNotification(dto));
    }
    async getMyDevice(req) {
        return (0, res_helpers_1.resOK)(await this.profileService.getMyDevices(req.user));
    }
    async deleteDevice(req, dto, password) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.deleteDevice(dto, password));
    }
    async updateMyName(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.updateMyName(dto));
    }
    async updateMyPrivacy(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.updateMyPrivacy(dto));
    }
    async getMyBlocked(req, dto) {
        return (0, res_helpers_1.resOK)(await this.profileService.getMyBlocked(req.user, dto));
    }
    async updateMyBio(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.updateMyBio(dto));
    }
    async updateMyPassword(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.updateMyPassword(dto));
    }
    async updateMyImage(req, file) {
        if (!file) {
            throw new common_1.BadRequestException("Image is required!");
        }
        return (0, res_helpers_1.resOK)(await this.profileService.updateMyImage(file, req.user));
    }
    async getMyChatRequest(req, dto) {
        return (0, res_helpers_1.resOK)(await this.profileService.getMyChatRequest(req.user, dto));
    }
    async getPeerProfile(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.getPeerProfile(dto));
    }
    async sendChatRequest(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.sendChatRequest(dto));
    }
    async updateChatRequest(req, dto, status) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.updateChatRequest(dto, status));
    }
    async deleteFcm(req) {
        return (0, res_helpers_1.resOK)(await this.profileService.deleteFcmFor(req.user));
    }
    async addFcm(req, pushKey, voipKey) {
        if (!pushKey && !voipKey) {
            throw new common_1.BadRequestException("pushKey or voipKey is required");
        }
        return (0, res_helpers_1.resOK)(await this.profileService.addPushKey(req.user, pushKey, voipKey));
    }
    async updateFcm(pushKey, req) {
        if (!pushKey) {
            throw new common_1.BadRequestException("pushKey is required");
        }
        return (0, res_helpers_1.resOK)(await this.profileService.updateFcm(req.user, pushKey));
    }
    async updateLanguage(lang, req) {
        if (!lang) {
            throw new common_1.BadRequestException("lang is required");
        }
        return (0, res_helpers_1.resOK)(await this.profileService.updateLanguage(req.user, lang));
    }
    async setVisit(req) {
        return (0, res_helpers_1.resOK)(await this.profileService.setVisit(req.user));
    }
    async getUserLastSeenAt(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.getUserLastSeenAt(dto));
    }
    async updatePassword(dto, req) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.updatePassword(req.user, dto));
    }
    async deleteMyAccount(req, password) {
        return (0, res_helpers_1.resOK)(await this.profileService.deleteMyAccount(req.user, password));
    }
    async checkVersion(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.checkVersion(dto));
    }
    async createReport(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.profileService.createReport(dto));
    }
};
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Get)("/"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.Get)("/app-config"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getConfig", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Get)("/users"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getUsersAndSearch", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Get)("/admin-notifications"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getAdminNotification", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Get)("/device"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getMyDevice", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Delete)("/device/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_id_dto_1.MongoIdDto, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteDevice", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Patch)("/name"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_my_name_dto_1.UpdateMyNameDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateMyName", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Patch)("/privacy"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_my_name_dto_1.UpdateMyPrivacyDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateMyPrivacy", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Get)("/blocked"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getMyBlocked", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Patch)("/bio"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_my_name_dto_1.UpdateMyBioDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateMyBio", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Patch)("/password"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_my_name_dto_1.UpdateMyPasswordDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateMyPassword", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.UseInterceptors)(upload_interceptors_1.imageFileInterceptor),
    (0, common_1.Patch)("/image"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateMyImage", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Get)("/chat-request"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getMyChatRequest", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Get)("/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_id_dto_1.MongoIdDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getPeerProfile", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Post)("/:id/chat-request"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_id_dto_1.MongoIdDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "sendChatRequest", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Patch)("/:id/chat-request"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_id_dto_1.MongoIdDto,
        update_my_name_dto_1.UpdateChatReqStatusDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateChatRequest", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Delete)("/push"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteFcm", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Post)("/push"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)("pushKey")),
    __param(2, (0, common_1.Body)("voipKey")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "addFcm", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Patch)("/push"),
    __param(0, (0, common_1.Body)("pushKey")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateFcm", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Patch)("/lang"),
    __param(0, (0, common_1.Body)("lang")),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updateLanguage", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Patch)("/visit"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "setVisit", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Get)("/users/:peerId/last-seen"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_peer_id_dto_1.MongoPeerIdDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "getUserLastSeenAt", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Patch)("/password"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_password_dto_1.default, Object]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Delete)("/delete-my-account"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "deleteMyAccount", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Patch)("/version"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, check_version_dto_1.default]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "checkVersion", null);
__decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, common_1.Post)("/report"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_report_system_dto_1.CreateReportSystemDto]),
    __metadata("design:returntype", Promise)
], ProfileController.prototype, "createReport", null);
ProfileController = __decorate([
    (0, v1_controller_decorator_1.V1Controller)("profile"),
    __metadata("design:paramtypes", [profile_service_1.ProfileService])
], ProfileController);
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map