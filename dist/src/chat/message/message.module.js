"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const message_entity_1 = require("./entities/message.entity");
const group_message_status_module_1 = require("../group_message_status/group_message_status.module");
const message_service_1 = require("./message.service");
const user_module_1 = require("../../api/user_modules/user/user.module");
const file_uploader_module_1 = require("../../common/file_uploader/file_uploader.module");
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    (0, common_1.Module)({
        providers: [message_service_1.MessageService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "message",
                    schema: message_entity_1.MessageSchema
                }]),
            user_module_1.UserModule,
            group_message_status_module_1.GroupMessageStatusModule,
            file_uploader_module_1.FileUploaderModule
        ],
        exports: [message_service_1.MessageService]
    })
], MessageModule);
exports.MessageModule = MessageModule;
//# sourceMappingURL=message.module.js.map