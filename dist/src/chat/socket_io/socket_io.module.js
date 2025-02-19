"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIoModule = void 0;
const common_1 = require("@nestjs/common");
const socket_io_service_1 = require("./socket_io.service");
const socket_io_gateway_1 = require("./socket_io.gateway");
const call_member_module_1 = require("../call_modules/call_member/call_member.module");
const user_module_1 = require("../../api/user_modules/user/user.module");
const room_member_module_1 = require("../room_member/room_member.module");
const auth_module_1 = require("../../api/auth/auth.module");
const message_module_1 = require("../message/message.module");
const room_middleware_module_1 = require("../room_middleware/room_middleware.module");
const user_device_module_1 = require("../../api/user_modules/user_device/user_device.module");
const call_history_module_1 = require("../call_modules/call_history/call_history.module");
let SocketIoModule = class SocketIoModule {
};
SocketIoModule = __decorate([
    (0, common_1.Module)({
        providers: [socket_io_gateway_1.SocketIoGateway, socket_io_service_1.SocketIoService],
        imports: [
            user_module_1.UserModule,
            room_member_module_1.RoomMemberModule,
            auth_module_1.AuthModule,
            message_module_1.MessageModule,
            room_middleware_module_1.RoomMiddlewareModule,
            call_history_module_1.CallHistoryModule,
            call_member_module_1.CallMemberModule,
            user_device_module_1.UserDeviceModule,
        ],
        exports: [socket_io_service_1.SocketIoService],
    })
], SocketIoModule);
exports.SocketIoModule = SocketIoModule;
//# sourceMappingURL=socket_io.module.js.map