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
exports.MessagesSearchDto = void 0;
const class_validator_1 = require("class-validator");
const startOfDay_1 = __importDefault(require("date-fns/startOfDay"));
const date_fns_1 = require("date-fns");
const enums_1 = require("../../../core/utils/enums");
const utils_1 = require("../../../core/utils/utils");
class MessagesSearchDto {
    getLimit() {
        if (this.limit) {
            if (this.limit <= 0 || this.limit > 30) {
                return 30;
            }
            return this.limit;
        }
        return 30;
    }
    getFilter() {
        let filter = {};
        if (this.text) {
            filter['c'] = {
                "$regex": +".*" + this.text + ".*",
                "$options": "i"
            };
        }
        if (this.from && this.to) {
            let sDate = (0, startOfDay_1.default)(new Date(this.from));
            let endDate = (0, date_fns_1.endOfDay)(new Date(this.to));
            filter['createdAt'] = {
                $gte: sDate,
                $lte: endDate
            };
        }
        if (this.filter) {
            if (this.filter == enums_1.MessageFilter.File) {
                filter['mT'] = enums_1.MessageType.File;
            }
            if (this.filter == enums_1.MessageFilter.Voice) {
                filter['mT'] = enums_1.MessageType.Voice;
            }
            if (this.filter == enums_1.MessageFilter.Links) {
                filter['linkAtt'] = { $ne: null };
            }
            if (this.filter == enums_1.MessageFilter.Media) {
                filter['$or'] = [
                    { mT: enums_1.MessageType.Image },
                    { mT: enums_1.MessageType.Video },
                ];
            }
        }
        if (this.lastId) {
            filter['_id'] = { $lt: (0, utils_1.newMongoObjId)(this.lastId) };
        }
        return filter;
    }
}
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['lastId']),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], MessagesSearchDto.prototype, "lastId", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], MessagesSearchDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    __metadata("design:type", Number)
], MessagesSearchDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['from']),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], MessagesSearchDto.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['to']),
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], MessagesSearchDto.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['isAsc']),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], MessagesSearchDto.prototype, "isAsc", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['filter']),
    (0, class_validator_1.IsEnum)(enums_1.MessageFilter),
    __metadata("design:type", String)
], MessagesSearchDto.prototype, "filter", void 0);
exports.MessagesSearchDto = MessagesSearchDto;
//# sourceMappingURL=messages_search_dto.js.map