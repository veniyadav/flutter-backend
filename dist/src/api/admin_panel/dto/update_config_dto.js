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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConfigDto = void 0;
const enums_1 = require("../../../core/utils/enums");
const class_validator_1 = require("class-validator");
const common_dto_1 = __importDefault(require("../../../core/common/dto/common.dto"));
class UpdateConfigDto extends common_dto_1.default {
}
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['enableAds']),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateConfigDto.prototype, "enableAds", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "approveMessage", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "appName", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "pendingMessage", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "feedbackEmail", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "shareAppMessage", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['allowWebLogin']),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateConfigDto.prototype, "allowWebLogin", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['allowMobileLogin']),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateConfigDto.prototype, "allowMobileLogin", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['allowCreateGroup']),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateConfigDto.prototype, "allowCreateGroup", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['allowCreateBroadcast']),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateConfigDto.prototype, "allowCreateBroadcast", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['allowDesktopLogin']),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateConfigDto.prototype, "allowDesktopLogin", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "privacyUrl", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "googlePayUrl", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "appleStoreUrl", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "macStoreUrl", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "webChatUrl", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "windowsStoreUrl", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Number)
], UpdateConfigDto.prototype, "maxExpireEmailTime", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)((o) => o.userRegisterStatus),
    (0, class_validator_1.IsEnum)(enums_1.RegisterStatus),
    __metadata("design:type", String)
], UpdateConfigDto.prototype, "userRegisterStatus", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Number)
], UpdateConfigDto.prototype, "callTimeout", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Number)
], UpdateConfigDto.prototype, "maxGroupMembers", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Number)
], UpdateConfigDto.prototype, "maxBroadcastMembers", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Number)
], UpdateConfigDto.prototype, "maxChatMediaSize", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['allowCall']),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateConfigDto.prototype, "allowCall", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['allowMessaging']),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateConfigDto.prototype, "allowMessaging", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['allowSendMedia']),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateConfigDto.prototype, "allowSendMedia", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Number)
], UpdateConfigDto.prototype, "maxForward", void 0);
exports.UpdateConfigDto = UpdateConfigDto;
//# sourceMappingURL=update_config_dto.js.map