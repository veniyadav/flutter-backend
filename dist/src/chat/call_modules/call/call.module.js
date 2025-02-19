"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallModule = void 0;
const common_1 = require("@nestjs/common");
const call_service_1 = require("./call.service");
const call_controller_1 = require("./call.controller");
const room_middleware_module_1 = require("../../room_middleware/room_middleware.module");
const socket_io_module_1 = require("../../socket_io/socket_io.module");
const call_member_module_1 = require("../call_member/call_member.module");
const app_config_module_1 = require("../../../api/app_config/app_config.module");
const user_module_1 = require("../../../api/user_modules/user/user.module");
const auth_module_1 = require("../../../api/auth/auth.module");
const notification_emitter_module_1 = require("../../../common/notification_emitter/notification_emitter.module");
const user_ban_module_1 = require("../../../api/user_modules/user_ban/user_ban.module");
const message_module_1 = require("../../message/message.module");
const call_emitter_1 = require("./call_emitter");
const user_device_module_1 = require("../../../api/user_modules/user_device/user_device.module");
const agora_module_1 = require("../../agora/agora.module");
const group_member_module_1 = require("../../group_member/group_member.module");
const call_history_module_1 = require("../call_history/call_history.module");
const room_member_module_1 = require("../../room_member/room_member.module");
let CallModule = class CallModule {
};
CallModule = __decorate([
    (0, common_1.Module)({
        controllers: [call_controller_1.CallController],
        providers: [call_service_1.CallService, call_emitter_1.CallEmitter],
        exports: [call_service_1.CallService],
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            room_middleware_module_1.RoomMiddlewareModule,
            user_ban_module_1.UserBanModule,
            notification_emitter_module_1.NotificationEmitterModule,
            socket_io_module_1.SocketIoModule,
            message_module_1.MessageModule,
            call_member_module_1.CallMemberModule,
            app_config_module_1.AppConfigModule,
            user_device_module_1.UserDeviceModule,
            agora_module_1.AgoraModule,
            group_member_module_1.GroupMemberModule,
            call_history_module_1.CallHistoryModule,
            room_member_module_1.RoomMemberModule,
        ]
    })
], CallModule);
exports.CallModule = CallModule;
//# sourceMappingURL=call.module.js.map