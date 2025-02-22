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
exports.BroadcastChannelController = void 0;
const common_1 = require("@nestjs/common");
const kick_members_dto_1 = require("../dto/kick.members.dto");
const broadcast_channel_service_1 = require("../services/broadcast.channel.service");
const create_broadcast_room_dto_1 = require("../dto/create-broadcast-room.dto");
const message_status_param_dto_1 = require("../dto/message_status_param_dto");
const verified_auth_guard_1 = require("../../../core/guards/verified.auth.guard");
const v1_controller_decorator_1 = require("../../../core/common/v1-controller.decorator");
const upload_interceptors_1 = require("../../../core/utils/upload_interceptors");
const app_validator_1 = require("../../../core/utils/app.validator");
const res_helpers_1 = require("../../../core/utils/res.helpers");
const mongo_room_id_dto_1 = require("../../../core/common/dto/mongo.room.id.dto");
const mongo_ids_dto_1 = require("../../../core/common/dto/mongo.ids.dto");
const users_search_dto_1 = require("../dto/users_search_dto");
const paginateDto_1 = require("../../../core/common/dto/paginateDto");
let BroadcastChannelController = class BroadcastChannelController {
    constructor(broadcastService) {
        this.broadcastService = broadcastService;
    }
    async createBroadcastChat(req, dto, file) {
        dto.myUser = req.user;
        if (file) {
            dto.imageBuffer = file.buffer;
        }
        try {
            dto.peerIds = (0, app_validator_1.jsonDecoder)(dto.peerIds);
        }
        catch (e) {
        }
        return (0, res_helpers_1.resOK)(await this.broadcastService.createBroadcastChat(dto));
    }
    async addMembersToBroadcast(req, bId, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.broadcastService.addMembersToBroadcast(bId.roomId, dto, null));
    }
    async getBroadcastMembers(req, mongoDto, dto) {
        return (0, res_helpers_1.resOK)(await this.broadcastService.getBroadcastMembers(req.user, dto, mongoDto.roomId));
    }
    async getBroadcastMyInfo(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.broadcastService.getBroadcastMyInfo(dto));
    }
    async getBroadcastMessageInfo(req, dto, paginateParams) {
        dto.myUser = req.user;
        paginateParams.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.broadcastService.getBroadcastMessageInfo(dto, paginateParams));
    }
    async kickBroadcastMember(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.broadcastService.kickBroadcastMember(dto));
    }
    async updateTitle(req, dto, title) {
        dto.myUser = req.user;
        if (!title) {
            throw new common_1.BadRequestException('title is required');
        }
        return (0, res_helpers_1.resOK)(await this.broadcastService.updateTitle(dto, title));
    }
    async updateImage(req, dto, file) {
        if (!file) {
            throw new common_1.BadRequestException("image is required");
        }
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.broadcastService.updateImage(dto, file));
    }
    async getAvailableUsersToAdd(req, dto, roomId) {
        return (0, res_helpers_1.resOK)(await this.broadcastService.getAvailableUsersToAdd(dto, roomId.roomId, req.user._id));
    }
};
__decorate([
    (0, common_1.UseInterceptors)(upload_interceptors_1.imageFileInterceptor),
    (0, common_1.Post)('/broadcast'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_broadcast_room_dto_1.CreateBroadcastRoomDto, Object]),
    __metadata("design:returntype", Promise)
], BroadcastChannelController.prototype, "createBroadcastChat", null);
__decorate([
    (0, common_1.Post)('/:roomId/broadcast/members'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto, mongo_ids_dto_1.MongoIdsDto]),
    __metadata("design:returntype", Promise)
], BroadcastChannelController.prototype, "addMembersToBroadcast", null);
__decorate([
    (0, common_1.Get)('/:roomId/broadcast/members'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto, users_search_dto_1.UsersSearchDto]),
    __metadata("design:returntype", Promise)
], BroadcastChannelController.prototype, "getBroadcastMembers", null);
__decorate([
    (0, common_1.Get)('/:roomId/broadcast/my-info'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], BroadcastChannelController.prototype, "getBroadcastMyInfo", null);
__decorate([
    (0, common_1.Get)('/:roomId/broadcast/message/:messageId/status/:type'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, message_status_param_dto_1.MessageStatusParamDto,
        paginateDto_1.DefaultPaginateParams]),
    __metadata("design:returntype", Promise)
], BroadcastChannelController.prototype, "getBroadcastMessageInfo", null);
__decorate([
    (0, common_1.Delete)('/:roomId/broadcast/members/:peerId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, kick_members_dto_1.KickMembersDto]),
    __metadata("design:returntype", Promise)
], BroadcastChannelController.prototype, "kickBroadcastMember", null);
__decorate([
    (0, common_1.Patch)('/:roomId/broadcast/title'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto, String]),
    __metadata("design:returntype", Promise)
], BroadcastChannelController.prototype, "updateTitle", null);
__decorate([
    (0, common_1.UseInterceptors)(upload_interceptors_1.imageFileInterceptor),
    (0, common_1.Patch)('/:roomId/broadcast/image'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto, Object]),
    __metadata("design:returntype", Promise)
], BroadcastChannelController.prototype, "updateImage", null);
__decorate([
    (0, common_1.Get)("/:roomId/broadcast/available-users-to-add"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object,
        mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], BroadcastChannelController.prototype, "getAvailableUsersToAdd", null);
BroadcastChannelController = __decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, v1_controller_decorator_1.V1Controller)('channel'),
    __metadata("design:paramtypes", [broadcast_channel_service_1.BroadcastChannelService])
], BroadcastChannelController);
exports.BroadcastChannelController = BroadcastChannelController;
//# sourceMappingURL=broadcast.channel.controller.js.map