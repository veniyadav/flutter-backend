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
exports.ChannelController = void 0;
const common_1 = require("@nestjs/common");
const channel_service_1 = require("../services/channel.service");
const verified_auth_guard_1 = require("../../../core/guards/verified.auth.guard");
const v1_controller_decorator_1 = require("../../../core/common/v1-controller.decorator");
const res_helpers_1 = require("../../../core/utils/res.helpers");
const mongo_room_id_dto_1 = require("../../../core/common/dto/mongo.room.id.dto");
const mongo_peer_id_dto_1 = require("../../../core/common/dto/mongo.peer.id.dto");
const mongo_peer_id_order_id_dto_1 = require("../../../core/common/dto/mongo.peer.id.order.id.dto");
const app_validator_1 = require("../../../core/utils/app.validator");
let ChannelController = class ChannelController {
    constructor(channelService) {
        this.channelService = channelService;
    }
    async getRooms(req, dto) {
        return (0, res_helpers_1.resOK)(await this.channelService.getRoomsLimited(dto, req.user._id));
    }
    async getRoomUnReadCount(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.getRoomUnReadCount(dto));
    }
    async getOrCreatePeerRoom(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.getOrCreatePeerRoom(dto, null));
    }
    async updateRoomTranslate(req, dto, transTo) {
        if (!transTo) {
            throw new common_1.BadRequestException('transTo is required');
        }
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.updateRoomTranslate(dto, transTo));
    }
    async changeRoomNickName(req, dto, name) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.changeNickName(dto, name));
    }
    async stopRoomTranslate(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.stopRoomTranslate(dto));
    }
    async getRoomById(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.getRoomById(dto));
    }
    async getUrlPreview(req, dto, url) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.getUrlPreview(dto, url));
    }
    async deliverRoomMessages(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.deliverRoomMessages(dto));
    }
    async muteRoomNotification(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.muteRoomNotification(dto));
    }
    async roomOneSeenOn(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.roomOneSeenOn(dto));
    }
    async roomOneSeenOff(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.roomOneSeenOff(dto));
    }
    async unMuteRoomNotification(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.unMuteRoomNotification(dto));
    }
    async archiveRoom(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.archiveRoom(dto));
    }
    async unArchiveRoom(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.unArchiveRoom(dto));
    }
    async getMySingleChatInfo(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.getMySingleChatInfo(dto));
    }
    async createOrderRoom(req, dto) {
        dto.myUser = req.user;
        try {
            dto.orderData = (0, app_validator_1.jsonDecoder)(dto.orderData);
        }
        catch (e) {
        }
        return (0, res_helpers_1.resOK)(await this.channelService.createOrderRoom(dto));
    }
    async getMyOrderChatInfo(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.getMyOrderChatInfo(dto));
    }
    async deleteRoom(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.deleteRoom(dto));
    }
    async clearRoomMessages(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelService.clearRoomMessages(dto));
    }
    async getStarMessages(req, dto) {
        return (0, res_helpers_1.resOK)(await this.channelService.getStarMessages(dto, req.user._id));
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getRooms", null);
__decorate([
    (0, common_1.Get)('/:roomId/un-read-count'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getRoomUnReadCount", null);
__decorate([
    (0, common_1.Post)('/peer-room/:peerId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_peer_id_dto_1.MongoPeerIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getOrCreatePeerRoom", null);
__decorate([
    (0, common_1.Patch)('/:roomId/translate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)('transTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto, String]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "updateRoomTranslate", null);
__decorate([
    (0, common_1.Patch)('/:roomId/nick-name'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto, Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "changeRoomNickName", null);
__decorate([
    (0, common_1.Patch)('/:roomId/translate/stop'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "stopRoomTranslate", null);
__decorate([
    (0, common_1.Get)('/:roomId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getRoomById", null);
__decorate([
    (0, common_1.Get)('/:roomId/url-preview'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto, Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getUrlPreview", null);
__decorate([
    (0, common_1.Patch)('/:roomId/deliver'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "deliverRoomMessages", null);
__decorate([
    (0, common_1.Patch)('/:roomId/notification/mute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "muteRoomNotification", null);
__decorate([
    (0, common_1.Patch)('/:roomId/one-seen/on'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "roomOneSeenOn", null);
__decorate([
    (0, common_1.Patch)('/:roomId/one-seen/off'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "roomOneSeenOff", null);
__decorate([
    (0, common_1.Patch)('/:roomId/notification/un-mute'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "unMuteRoomNotification", null);
__decorate([
    (0, common_1.Patch)('/:roomId/archive'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "archiveRoom", null);
__decorate([
    (0, common_1.Patch)('/:roomId/un-archive'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "unArchiveRoom", null);
__decorate([
    (0, common_1.Get)('/:roomId/single/my-info'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getMySingleChatInfo", null);
__decorate([
    (0, common_1.Post)('/order'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_peer_id_order_id_dto_1.CreateOrderRoomDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "createOrderRoom", null);
__decorate([
    (0, common_1.Get)('/:roomId/order/my-info'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getMyOrderChatInfo", null);
__decorate([
    (0, common_1.Delete)('/:roomId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "deleteRoom", null);
__decorate([
    (0, common_1.Delete)('/:roomId/clear'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "clearRoomMessages", null);
__decorate([
    (0, common_1.Get)('/messages/stars'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChannelController.prototype, "getStarMessages", null);
ChannelController = __decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, v1_controller_decorator_1.V1Controller)('channel'),
    __metadata("design:paramtypes", [channel_service_1.ChannelService])
], ChannelController);
exports.ChannelController = ChannelController;
//# sourceMappingURL=channel.controller.js.map