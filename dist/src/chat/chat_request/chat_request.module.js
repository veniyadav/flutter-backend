"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRequestModule = void 0;
const common_1 = require("@nestjs/common");
const chat_request_service_1 = require("./chat_request.service");
const mongoose_1 = require("@nestjs/mongoose");
const chat_request_entity_1 = require("./entities/chat.request.entity");
let ChatRequestModule = class ChatRequestModule {
};
ChatRequestModule = __decorate([
    (0, common_1.Module)({
        providers: [chat_request_service_1.ChatRequestService],
        exports: [chat_request_service_1.ChatRequestService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "chat_request",
                    schema: chat_request_entity_1.ChatRequestSchema
                }]),
        ]
    })
], ChatRequestModule);
exports.ChatRequestModule = ChatRequestModule;
//# sourceMappingURL=chat_request.module.js.map