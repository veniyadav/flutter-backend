"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBanModule = void 0;
const common_1 = require("@nestjs/common");
const user_ban_service_1 = require("./user_ban.service");
const user_ban_controller_1 = require("./user_ban.controller");
const ban_module_1 = require("../../ban/ban.module");
const user_module_1 = require("../user/user.module");
const auth_module_1 = require("../../auth/auth.module");
const socket_io_module_1 = require("../../../chat/socket_io/socket_io.module");
const room_member_module_1 = require("../../../chat/room_member/room_member.module");
const room_middleware_module_1 = require("../../../chat/room_middleware/room_middleware.module");
let UserBanModule = class UserBanModule {
};
UserBanModule = __decorate([
    (0, common_1.Module)({
        controllers: [user_ban_controller_1.UserBanController],
        providers: [user_ban_service_1.UserBanService],
        imports: [
            ban_module_1.BanModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            socket_io_module_1.SocketIoModule,
            room_member_module_1.RoomMemberModule,
            room_middleware_module_1.RoomMiddlewareModule
        ],
        exports: [user_ban_service_1.UserBanService]
    })
], UserBanModule);
exports.UserBanModule = UserBanModule;
//# sourceMappingURL=user_ban.module.js.map