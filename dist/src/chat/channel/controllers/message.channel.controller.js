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
exports.MessageChannelController = void 0;
const common_1 = require("@nestjs/common");
const message_channel_service_1 = require("../services/message.channel.service");
const platform_express_1 = require("@nestjs/platform-express");
const send_message_dto_1 = require("../dto/send.message.dto");
const delete_message_dto_1 = require("../dto/delete.message.dto");
const verified_auth_guard_1 = require("../../../core/guards/verified.auth.guard");
const v1_controller_decorator_1 = require("../../../core/common/v1-controller.decorator");
const mongo_room_id_dto_1 = require("../../../core/common/dto/mongo.room.id.dto");
const res_helpers_1 = require("../../../core/utils/res.helpers");
const messages_search_dto_1 = require("../../message/dto/messages_search_dto");
const room_id_and_msg_id_dto_1 = require("../../../core/common/dto/room.id.and.msg.id.dto");
let MessageChannelController = class MessageChannelController {
    constructor(channelMessageService) {
        this.channelMessageService = channelMessageService;
    }
    async createMessage(req, roomDtoId, dto, file) {
        dto.myUser = req.user;
        if (dto.isRequireFile()) {
            dto._mediaFile = file[0];
            dto._secondMediaFile = file[1] ?? undefined;
            if (!dto._mediaFile)
                throw new common_1.BadRequestException("Msg type " + dto.messageType + " required file in multipart or file bigger than the limit!");
        }
        dto._roomId = roomDtoId.roomId;
        dto._platform = dto.myUser.currentDevice.platform;
        return ((0, res_helpers_1.resOK)(await this.channelMessageService.createMessage(dto)));
    }
    async deleteRoomMessage(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelMessageService.deleteRoomMessage(dto));
    }
    async starRoomMessage(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelMessageService.starRoomMessage(dto));
    }
    async unStarRoomMessage(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelMessageService.unStarRoomMessage(dto));
    }
    async getMyAllStarMessages(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelMessageService.getMyAllStarMessages(dto));
    }
    async getRoomMessages(req, paramDto, dto) {
        return (0, res_helpers_1.resOK)(await this.channelMessageService.getRoomMessages(req.user._id, paramDto.roomId, dto));
    }
    async oneSeeThisMessage(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.channelMessageService.oneSeeThisMessage(dto));
    }
};
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', 2, {
        limits: {
            files: 4,
            fields: 400,
            fieldSize: 400000000000,
            fieldNameSize: 400000000000,
        },
    })),
    (0, common_1.Post)('/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto,
        send_message_dto_1.SendMessageDto, Array]),
    __metadata("design:returntype", Promise)
], MessageChannelController.prototype, "createMessage", null);
__decorate([
    (0, common_1.Delete)('/:messageId/delete/:type'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, delete_message_dto_1.DeleteMessageDto]),
    __metadata("design:returntype", Promise)
], MessageChannelController.prototype, "deleteRoomMessage", null);
__decorate([
    (0, common_1.Post)('/:messageId/star'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, room_id_and_msg_id_dto_1.RoomIdAndMsgIdDto]),
    __metadata("design:returntype", Promise)
], MessageChannelController.prototype, "starRoomMessage", null);
__decorate([
    (0, common_1.Post)('/:messageId/un-star'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, room_id_and_msg_id_dto_1.RoomIdAndMsgIdDto]),
    __metadata("design:returntype", Promise)
], MessageChannelController.prototype, "unStarRoomMessage", null);
__decorate([
    (0, common_1.Get)('/stars'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], MessageChannelController.prototype, "getMyAllStarMessages", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto,
        messages_search_dto_1.MessagesSearchDto]),
    __metadata("design:returntype", Promise)
], MessageChannelController.prototype, "getRoomMessages", null);
__decorate([
    (0, common_1.Patch)('/:messageId/one-seen'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, room_id_and_msg_id_dto_1.RoomIdAndMsgIdDto]),
    __metadata("design:returntype", Promise)
], MessageChannelController.prototype, "oneSeeThisMessage", null);
MessageChannelController = __decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, v1_controller_decorator_1.V1Controller)('channel/:roomId/message'),
    __metadata("design:paramtypes", [message_channel_service_1.MessageChannelService])
], MessageChannelController);
exports.MessageChannelController = MessageChannelController;
//# sourceMappingURL=message.channel.controller.js.map