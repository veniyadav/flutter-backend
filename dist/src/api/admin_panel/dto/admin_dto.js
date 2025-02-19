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
exports.GetVersionDto = exports.CreateNewVersionDto = exports.BanToDto = void 0;
const mongo_id_dto_1 = require("../../../core/common/dto/mongo.id.dto");
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../core/utils/enums");
const common_dto_1 = __importDefault(require("../../../core/common/dto/common.dto"));
class BanToDto extends mongo_id_dto_1.MongoIdDto {
}
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], BanToDto.prototype, "banTo", void 0);
exports.BanToDto = BanToDto;
class CreateNewVersionDto {
}
__decorate([
    (0, class_validator_1.IsSemVer)(),
    __metadata("design:type", String)
], CreateNewVersionDto.prototype, "semVer", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNewVersionDto.prototype, "notify", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], CreateNewVersionDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.Platform),
    __metadata("design:type", String)
], CreateNewVersionDto.prototype, "platform", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateNewVersionDto.prototype, "critical", void 0);
exports.CreateNewVersionDto = CreateNewVersionDto;
class GetVersionDto extends common_dto_1.default {
}
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.Platform),
    __metadata("design:type", String)
], GetVersionDto.prototype, "platform", void 0);
exports.GetVersionDto = GetVersionDto;
//# sourceMappingURL=admin_dto.js.map