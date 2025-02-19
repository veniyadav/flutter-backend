"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastMemberModule = void 0;
const common_1 = require("@nestjs/common");
const broadcast_member_service_1 = require("./broadcast_member.service");
const mongoose_1 = require("@nestjs/mongoose");
const broadcast_member_entity_1 = require("./entities/broadcast_member.entity");
let BroadcastMemberModule = class BroadcastMemberModule {
};
BroadcastMemberModule = __decorate([
    (0, common_1.Module)({
        providers: [broadcast_member_service_1.BroadcastMemberService],
        exports: [broadcast_member_service_1.BroadcastMemberService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "broadcast_member",
                    schema: broadcast_member_entity_1.BroadcastMemberSchema
                }]),
        ]
    })
], BroadcastMemberModule);
exports.BroadcastMemberModule = BroadcastMemberModule;
//# sourceMappingURL=broadcast_member.module.js.map