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
exports.CreateCallMemberDto = void 0;
const class_validator_1 = require("class-validator");
const common_dto_1 = __importDefault(require("../../../../core/common/dto/common.dto"));
const enums_1 = require("../../../../core/utils/enums");
class CreateCallMemberDto extends common_dto_1.default {
}
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Object)
], CreateCallMemberDto.prototype, "payload", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateCallMemberDto.prototype, "withVideo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.MeetPlatform),
    __metadata("design:type", String)
], CreateCallMemberDto.prototype, "meetPlatform", void 0);
exports.CreateCallMemberDto = CreateCallMemberDto;
//# sourceMappingURL=create-call_member.dto.js.map