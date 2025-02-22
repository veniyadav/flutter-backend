"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgoraModule = void 0;
const common_1 = require("@nestjs/common");
const agora_service_1 = require("./agora.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("../../api/user_modules/user/user.module");
let AgoraModule = class AgoraModule {
};
AgoraModule = __decorate([
    (0, common_1.Module)({
        exports: [agora_service_1.AgoraService],
        providers: [agora_service_1.AgoraService],
        imports: [
            config_1.ConfigModule,
            user_module_1.UserModule
        ]
    })
], AgoraModule);
exports.AgoraModule = AgoraModule;
//# sourceMappingURL=agora.module.js.map