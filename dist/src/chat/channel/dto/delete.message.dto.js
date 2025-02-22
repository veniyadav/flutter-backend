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
exports.DeleteMessageDto = void 0;
const class_validator_1 = require("class-validator");
const room_id_and_msg_id_dto_1 = require("../../../core/common/dto/room.id.and.msg.id.dto");
const enums_1 = require("../../../core/utils/enums");
class DeleteMessageDto extends room_id_and_msg_id_dto_1.RoomIdAndMsgIdDto {
}
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.DeleteMessageType),
    __metadata("design:type", String)
], DeleteMessageDto.prototype, "type", void 0);
exports.DeleteMessageDto = DeleteMessageDto;
//# sourceMappingURL=delete.message.dto.js.map