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
exports.UserBanController = void 0;
const common_1 = require("@nestjs/common");
const user_ban_service_1 = require("./user_ban.service");
const verified_auth_guard_1 = require("../../../core/guards/verified.auth.guard");
const mongo_peer_id_dto_1 = require("../../../core/common/dto/mongo.peer.id.dto");
const res_helpers_1 = require("../../../core/utils/res.helpers");
const v1_controller_decorator_1 = require("../../../core/common/v1-controller.decorator");
let UserBanController = class UserBanController {
    constructor(userBanService) {
        this.userBanService = userBanService;
    }
    async ban(dto, req) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.userBanService.ban(dto));
    }
    async checkBans(dto, req) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.userBanService.checkBans(dto));
    }
    async unBan(dto, req) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.userBanService.unBan(dto));
    }
};
__decorate([
    (0, common_1.Post)('/:peerId/ban'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_peer_id_dto_1.MongoPeerIdDto, Object]),
    __metadata("design:returntype", Promise)
], UserBanController.prototype, "ban", null);
__decorate([
    (0, common_1.Get)('/:peerId/ban'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_peer_id_dto_1.MongoPeerIdDto, Object]),
    __metadata("design:returntype", Promise)
], UserBanController.prototype, "checkBans", null);
__decorate([
    (0, common_1.Post)('/:peerId/un-ban'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongo_peer_id_dto_1.MongoPeerIdDto, Object]),
    __metadata("design:returntype", Promise)
], UserBanController.prototype, "unBan", null);
UserBanController = __decorate([
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    (0, v1_controller_decorator_1.V1Controller)('user-ban'),
    __metadata("design:paramtypes", [user_ban_service_1.UserBanService])
], UserBanController);
exports.UserBanController = UserBanController;
//# sourceMappingURL=user_ban.controller.js.map