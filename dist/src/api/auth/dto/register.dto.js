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
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_sanitizer_1 = require("class-sanitizer");
const constants_1 = require("../../../core/utils/constants");
const enums_1 = require("../../../core/utils/enums");
const res_helpers_1 = require("../../../core/utils/res.helpers");
class RegisterDto {
}
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.ValidateIf)(object => object['method'] == enums_1.RegisterMethod.email),
    (0, class_validator_1.IsEmail)({}, { message: res_helpers_1.i18nApi.emailMustBeValid }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.MaxLength)(constants_1.usersMaxNameSize),
    __metadata("design:type", String)
], RegisterDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_sanitizer_1.Trim)(),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], RegisterDto.prototype, "deviceId", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_sanitizer_1.Trim)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "pushKey", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "language", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "deviceInfo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.RegisterMethod),
    __metadata("design:type", String)
], RegisterDto.prototype, "method", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.Platform),
    __metadata("design:type", String)
], RegisterDto.prototype, "platform", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(constants_1.usersMaxPasswordSize),
    (0, class_validator_1.MinLength)(constants_1.usersMimePasswordSize),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RegisterDto.prototype, "password", void 0);
exports.default = RegisterDto;
//# sourceMappingURL=register.dto.js.map