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
exports.GroupChannelController = void 0;
const common_1 = require("@nestjs/common");
const group_channel_service_1 = require("../services/group.channel.service");
const update_role_dto_1 = require("../dto/update.role.dto");
const create_group_room_dto_1 = require("../dto/create-group-room.dto");
const kick_members_dto_1 = require("../dto/kick.members.dto");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const message_status_param_dto_1 = require("../dto/message_status_param_dto");
const verified_auth_guard_1 = require("../../../core/guards/verified.auth.guard");
const v1_controller_decorator_1 = require("../../../core/common/v1-controller.decorator");
const upload_interceptors_1 = require("../../../core/utils/upload_interceptors");
const app_validator_1 = require("../../../core/utils/app.validator");
const res_helpers_1 = require("../../../core/utils/res.helpers");
const mongo_room_id_dto_1 = require("../../../core/common/dto/mongo.room.id.dto");
const mongo_ids_dto_1 = require("../../../core/common/dto/mongo.ids.dto");
const paginateDto_1 = require("../../../core/common/dto/paginateDto");
const users_search_dto_1 = require("../dto/users_search_dto");
let GroupChannelController = class GroupChannelController {
    constructor(groupService, connection) {
        this.groupService = groupService;
        this.connection = connection;
    }
    async createGroupChat(req, dto, file) {
        dto.myUser = req.user;
        if (file) {
            dto.imageBuffer = file.buffer;
        }
        try {
            dto.peerIds = (0, app_validator_1.jsonDecoder)(dto.peerIds);
        }
        catch (e) {
        }
        try {
            if (dto.extraData)
                dto.extraData = (0, app_validator_1.jsonDecoder)(dto.extraData);
        }
        catch (e) {
        }
        return (0, res_helpers_1.resOK)(await this.groupService.createGroupChat(dto, null));
    }
    async addMembersToGroup(req, gId, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.groupService.addMembersToGroup(gId.roomId, dto));
    }
    async updateUserRole(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.groupService.changeGroupUserRole(dto));
    }
    async getGroupMessageInfo(req, dto, paginateParams) {
        dto.myUser = req.user;
        paginateParams.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.groupService.getGroupMessageInfo(dto, paginateParams));
    }
    async getMyGroupInfo(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.groupService.getMyGroupInfo(dto));
    }
    async updateGroupExtraData(req, dto, data) {
        dto.myUser = req.user;
        try {
            data = (0, app_validator_1.jsonDecoder)(data);
        }
        catch (err) {
        }
        return (0, res_helpers_1.resOK)(await this.groupService.updateGroupExtraData(dto, data));
    }
    async getMyGroupStatus(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.groupService.getMyGroupStatus(dto));
    }
    async getGroupMembers(req, mongoDto, dto) {
        return (0, res_helpers_1.resOK)(await this.groupService.getGroupMembers(req.user, dto, mongoDto.roomId));
    }
    async kickGroupMember(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.groupService.kickGroupMember(dto));
    }
    async leaveGroupChat(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.groupService.leaveGroupChat(dto));
    }
    async updateTitle(req, dto, title) {
        dto.myUser = req.user;
        if (!title) {
            throw new common_1.BadRequestException("title is required");
        }
        return (0, res_helpers_1.resOK)(await this.groupService.updateTitle(dto, title));
    }
    async updateDescription(req, dto, description) {
        dto.myUser = req.user;
        if (!description) {
            throw new common_1.BadRequestException("description is required");
        }
        return (0, res_helpers_1.resOK)(await this.groupService.updateDescription(dto, description));
    }
    async updateImage(req, dto, file) {
        if (!file) {
            throw new common_1.BadRequestException("image is required");
        }
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.groupService.updateImage(dto, file));
    }
    async getAvailableUsersToAdd(req, dto, roomId) {
        return (0, res_helpers_1.resOK)(await this.groupService.getAvailableUsersToAdd(dto, roomId.roomId, req.user._id));
    }
};
__decorate([
    (0, common_1.UseInterceptors)(upload_interceptors_1.imageFileInterceptor),
    (0, common_1.Post)("/group"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_group_room_dto_1.CreateGroupRoomDto, Object]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "createGroupChat", null);
__decorate([
    (0, common_1.Post)("/:roomId/group/members"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto,
        mongo_ids_dto_1.MongoIdsDto]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "addMembersToGroup", null);
__decorate([
    (0, common_1.Patch)("/:roomId/group/members/:peerId/:role"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_role_dto_1.UpdateRoleDto]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "updateUserRole", null);
__decorate([
    (0, common_1.Get)("/:roomId/group/message/:messageId/status/:type"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, message_status_param_dto_1.MessageStatusParamDto,
        paginateDto_1.DefaultPaginateParams]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "getGroupMessageInfo", null);
__decorate([
    (0, common_1.Get)("/:roomId/group/my-info"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "getMyGroupInfo", null);
__decorate([
    (0, common_1.Patch)("/:roomId/group/extra-data"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto, Object]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "updateGroupExtraData", null);
__decorate([
    (0, common_1.Get)("/:roomId/group/my-status"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "getMyGroupStatus", null);
__decorate([
    (0, common_1.Get)("/:roomId/group/members"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto,
        users_search_dto_1.UsersSearchDto]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "getGroupMembers", null);
__decorate([
    (0, common_1.Delete)("/:roomId/group/members/:peerId"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, kick_members_dto_1.KickMembersDto]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "kickGroupMember", null);
__decorate([
    (0, common_1.Post)("/:roomId/group/leave"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "leaveGroupChat", null);
__decorate([
    (0, common_1.Patch)("/:roomId/group/title"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)("title")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto, String]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "updateTitle", null);
__decorate([
    (0, common_1.Patch)("/:roomId/group/description"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)("description")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto, String]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "updateDescription", null);
__decorate([
    (0, common_1.UseInterceptors)(upload_interceptors_1.imageFileInterceptor),
    (0, common_1.Patch)("/:roomId/group/image"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto, Object]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Get)("/:roomId/group/available-users-to-add"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object,
        mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], GroupChannelController.prototype, "getAvailableUsersToAdd", null);
GroupChannelController = __decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, v1_controller_decorator_1.V1Controller)("channel"),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [group_channel_service_1.GroupChannelService, mongoose_2.default.Connection])
], GroupChannelController);
exports.GroupChannelController = GroupChannelController;
//# sourceMappingURL=group.channel.controller.js.map