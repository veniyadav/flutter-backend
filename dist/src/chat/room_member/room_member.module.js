"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomMemberModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const room_member_service_1 = require("./room_member.service");
const room_member_entity_1 = require("./entities/room_member.entity");
const user_module_1 = require("../../api/user_modules/user/user.module");
let RoomMemberModule = class RoomMemberModule {
};
RoomMemberModule = __decorate([
    (0, common_1.Module)({
        providers: [room_member_service_1.RoomMemberService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "room_member",
                    schema: room_member_entity_1.RoomMemberSchema
                }]),
            user_module_1.UserModule,
        ],
        exports: [room_member_service_1.RoomMemberService]
    })
], RoomMemberModule);
exports.RoomMemberModule = RoomMemberModule;
//# sourceMappingURL=room_member.module.js.map