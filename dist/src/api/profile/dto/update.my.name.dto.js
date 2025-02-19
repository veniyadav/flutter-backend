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
exports.UpdateMyPasswordDto = exports.UpdateMyBioDto = exports.UpdateChatReqStatusDto = exports.UpdateMyPrivacyDto = exports.UpdateMyNameDto = void 0;
const class_validator_1 = require("class-validator");
const common_dto_1 = __importDefault(require("../../../core/common/dto/common.dto"));
const enums_1 = require("../../../core/utils/enums");
class UpdateMyNameDto extends common_dto_1.default {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMyNameDto.prototype, "fullName", void 0);
exports.UpdateMyNameDto = UpdateMyNameDto;
class UpdateMyPrivacyDto extends common_dto_1.default {
}
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.UserPrivacyTypes),
    __metadata("design:type", String)
], UpdateMyPrivacyDto.prototype, "startChat", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateMyPrivacyDto.prototype, "publicSearch", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateMyPrivacyDto.prototype, "lastSeen", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.UserPrivacyTypes),
    __metadata("design:type", String)
], UpdateMyPrivacyDto.prototype, "showStory", void 0);
exports.UpdateMyPrivacyDto = UpdateMyPrivacyDto;
class UpdateChatReqStatusDto extends common_dto_1.default {
}
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.ChatRequestStatus),
    __metadata("design:type", String)
], UpdateChatReqStatusDto.prototype, "status", void 0);
exports.UpdateChatReqStatusDto = UpdateChatReqStatusDto;
class UpdateMyBioDto extends common_dto_1.default {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMyBioDto.prototype, "bio", void 0);
exports.UpdateMyBioDto = UpdateMyBioDto;
class UpdateMyPasswordDto extends common_dto_1.default {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMyPasswordDto.prototype, "oldPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMyPasswordDto.prototype, "newPassword", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateMyPasswordDto.prototype, "newConfPassword", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateMyPasswordDto.prototype, "logoutAll", void 0);
exports.UpdateMyPasswordDto = UpdateMyPasswordDto;
//# sourceMappingURL=update.my.name.dto.js.map