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
exports.CallController = void 0;
const common_1 = require("@nestjs/common");
const verified_auth_guard_1 = require("../../../core/guards/verified.auth.guard");
const res_helpers_1 = require("../../../core/utils/res.helpers");
const create_call_member_dto_1 = require("./dto/create-call_member.dto");
const accept_call_member_dto_1 = require("./dto/accept-call_member.dto");
const call_service_1 = require("./call.service");
const mongo_room_id_dto_1 = require("../../../core/common/dto/mongo.room.id.dto");
const v1_controller_decorator_1 = require("../../../core/common/v1-controller.decorator");
const mongo_id_dto_1 = require("../../../core/common/dto/mongo.id.dto");
const mongo_call_id_dto_1 = require("../../../core/common/dto/mongo.call.id.dto");
let CallController = class CallController {
    constructor(callService) {
        this.callService = callService;
    }
    async createCall(req, roomIdDto, dto) {
        dto.myUser = req.user;
        dto.roomId = roomIdDto.roomId;
        return (0, res_helpers_1.resOK)(await this.callService.createCall(dto));
    }
    async getRingCall(req) {
        return (0, res_helpers_1.resOK)(await this.callService.getRingCall(req.user._id));
    }
    async getAgoraAccess(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.callService.getAgoraAccess(dto));
    }
    async acceptCall(req, meetIdDto, dto) {
        dto.myUser = req.user;
        dto.callId = meetIdDto.callId;
        return (0, res_helpers_1.resOK)(await this.callService.acceptCall(dto));
    }
    async endCallV2(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.callService.endCallV2(dto));
    }
    async getCallsHistory(req) {
        return (0, res_helpers_1.resOK)(await this.callService.getCallsHistory(req.user));
    }
    async deleteAllHistory(req) {
        return (0, res_helpers_1.resOK)(await this.callService.deleteAllHistory(req.user));
    }
    async deleteOneHistory(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.callService.deleteOneHistory(dto));
    }
};
__decorate([
    (0, common_1.Post)('/create/:roomId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto,
        create_call_member_dto_1.CreateCallMemberDto]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "createCall", null);
__decorate([
    (0, common_1.Get)('/active'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "getRingCall", null);
__decorate([
    (0, common_1.Get)('/agora-access/:roomId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_room_id_dto_1.MongoRoomIdDto]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "getAgoraAccess", null);
__decorate([
    (0, common_1.Post)('/accept/:callId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_call_id_dto_1.MongoCallIdDto,
        accept_call_member_dto_1.AcceptCallMemberDto]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "acceptCall", null);
__decorate([
    (0, common_1.Post)('/end/v2/:callId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_call_id_dto_1.MongoCallIdDto]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "endCallV2", null);
__decorate([
    (0, common_1.Get)("/history"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "getCallsHistory", null);
__decorate([
    (0, common_1.Delete)("/history/clear"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "deleteAllHistory", null);
__decorate([
    (0, common_1.Delete)("/history/clear/:id"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mongo_id_dto_1.MongoIdDto]),
    __metadata("design:returntype", Promise)
], CallController.prototype, "deleteOneHistory", null);
CallController = __decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, v1_controller_decorator_1.V1Controller)('call'),
    __metadata("design:paramtypes", [call_service_1.CallService])
], CallController);
exports.CallController = CallController;
//# sourceMappingURL=call.controller.js.map