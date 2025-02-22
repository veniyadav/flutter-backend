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
exports.UserVersionController = void 0;
const common_1 = require("@nestjs/common");
const user_version_service_1 = require("./user_version.service");
const check_version_dto_1 = __importDefault(require("../../profile/dto/check-version.dto"));
const res_helpers_1 = require("../../../core/utils/res.helpers");
const v1_controller_decorator_1 = require("../../../core/common/v1-controller.decorator");
const verified_auth_guard_1 = require("../../../core/guards/verified.auth.guard");
let UserVersionController = class UserVersionController {
    constructor(userVersionService) {
        this.userVersionService = userVersionService;
    }
    async checkVersion(req, dto) {
        dto.myUser = req.user;
        return (0, res_helpers_1.resOK)(await this.userVersionService.checkVersion(dto));
    }
};
__decorate([
    (0, common_1.Patch)("/"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, check_version_dto_1.default]),
    __metadata("design:returntype", Promise)
], UserVersionController.prototype, "checkVersion", null);
UserVersionController = __decorate([
    (0, v1_controller_decorator_1.V1Controller)('user-version'),
    (0, common_1.UseGuards)(verified_auth_guard_1.VerifiedAuthGuard),
    __metadata("design:paramtypes", [user_version_service_1.UserVersionService])
], UserVersionController);
exports.UserVersionController = UserVersionController;
//# sourceMappingURL=user_version.controller.js.map