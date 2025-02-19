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
exports.DefaultPaginateParams = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const common_dto_1 = __importDefault(require("./common.dto"));
class DefaultPaginateParams extends common_dto_1.default {
    getLimit() {
        let limit = this.limit ? parseInt(this.limit) : 20;
        if (limit <= 0) {
            throw new common_1.BadRequestException("limit must bigger than 0");
        }
        return limit;
    }
    getPage() {
        let page = this.page ? parseInt(this.page) : 1;
        if (parseInt(this.page) <= 0) {
            throw new common_1.BadRequestException("page must bigger than 0");
        }
        return page;
    }
}
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], DefaultPaginateParams.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], DefaultPaginateParams.prototype, "page", void 0);
exports.DefaultPaginateParams = DefaultPaginateParams;
//# sourceMappingURL=paginateDto.js.map