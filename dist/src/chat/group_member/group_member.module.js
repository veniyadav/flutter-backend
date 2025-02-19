"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMemberModule = void 0;
const common_1 = require("@nestjs/common");
const group_member_service_1 = require("./group_member.service");
const mongoose_1 = require("@nestjs/mongoose");
const group_member_entity_1 = require("./entities/group_member.entity");
let GroupMemberModule = class GroupMemberModule {
};
GroupMemberModule = __decorate([
    (0, common_1.Module)({
        providers: [group_member_service_1.GroupMemberService],
        exports: [group_member_service_1.GroupMemberService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "group_member",
                    schema: group_member_entity_1.GroupMemberSchema
                }]),
        ]
    })
], GroupMemberModule);
exports.GroupMemberModule = GroupMemberModule;
//# sourceMappingURL=group_member.module.js.map