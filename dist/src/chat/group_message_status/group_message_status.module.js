"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMessageStatusModule = void 0;
const common_1 = require("@nestjs/common");
const group_message_status_service_1 = require("./group_message_status.service");
const mongoose_1 = require("@nestjs/mongoose");
const group_message_status_entity_1 = require("./entities/group_message_status.entity");
let GroupMessageStatusModule = class GroupMessageStatusModule {
};
GroupMessageStatusModule = __decorate([
    (0, common_1.Module)({
        providers: [group_message_status_service_1.GroupMessageStatusService],
        exports: [group_message_status_service_1.GroupMessageStatusService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "group_message_status",
                    schema: group_message_status_entity_1.GroupMessageStatusSchema
                }]),
        ]
    })
], GroupMessageStatusModule);
exports.GroupMessageStatusModule = GroupMessageStatusModule;
//# sourceMappingURL=group_message_status.module.js.map