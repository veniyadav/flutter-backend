"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallMemberModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const call_member_entity_1 = require("./entities/call_member.entity");
const call_member_service_1 = require("./call_member.service");
let CallMemberModule = class CallMemberModule {
};
CallMemberModule = __decorate([
    (0, common_1.Module)({
        providers: [call_member_service_1.CallMemberService],
        exports: [call_member_service_1.CallMemberService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "meet_member",
                    schema: call_member_entity_1.MeetMemberSchema
                }]),
        ]
    })
], CallMemberModule);
exports.CallMemberModule = CallMemberModule;
//# sourceMappingURL=call_member.module.js.map