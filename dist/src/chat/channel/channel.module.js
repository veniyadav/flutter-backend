"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChannelModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("../../api/user_modules/user/user.module");
const message_module_1 = require("../message/message.module");
const room_member_module_1 = require("../room_member/room_member.module");
const socket_io_module_1 = require("../socket_io/socket_io.module");
const file_uploader_module_1 = require("../../common/file_uploader/file_uploader.module");
const auth_module_1 = require("../../api/auth/auth.module");
const notification_emitter_module_1 = require("../../common/notification_emitter/notification_emitter.module");
const single_room_settings_module_1 = require("../single_room_settings/single_room_settings.module");
const group_settings_module_1 = require("../group_settings/group_settings.module");
const broadcast_settings_module_1 = require("../broadcast_settings/broadcast_settings.module");
const group_member_module_1 = require("../group_member/group_member.module");
const broadcast_member_module_1 = require("../broadcast_member/broadcast_member.module");
const room_middleware_module_1 = require("../room_middleware/room_middleware.module");
const app_config_module_1 = require("../../api/app_config/app_config.module");
const group_message_status_module_1 = require("../group_message_status/group_message_status.module");
const user_ban_module_1 = require("../../api/user_modules/user_ban/user_ban.module");
const order_room_settings_module_1 = require("../order_room_settings/order_room_settings.module");
const group_channel_controller_1 = require("./controllers/group.channel.controller");
const broadcast_channel_controller_1 = require("./controllers/broadcast.channel.controller");
const message_channel_controller_1 = require("./controllers/message.channel.controller");
const group_channel_service_1 = require("./services/group.channel.service");
const broadcast_channel_service_1 = require("./services/broadcast.channel.service");
const message_channel_service_1 = require("./services/message.channel.service");
const channel_service_1 = require("./services/channel.service");
const channel_controller_1 = require("./controllers/channel.controller");
const notification_emitter_channel_service_1 = require("./services/notification_emitter_channel.service");
const user_device_module_1 = require("../../api/user_modules/user_device/user_device.module");
let ChannelModule = class ChannelModule {
};
ChannelModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            channel_controller_1.ChannelController,
            group_channel_controller_1.GroupChannelController,
            broadcast_channel_controller_1.BroadcastChannelController,
            message_channel_controller_1.MessageChannelController,
        ],
        providers: [
            channel_service_1.ChannelService,
            group_channel_service_1.GroupChannelService,
            broadcast_channel_service_1.BroadcastChannelService,
            message_channel_service_1.MessageChannelService,
            notification_emitter_channel_service_1.NotificationEmitterChannelService
        ],
        imports: [
            user_module_1.UserModule,
            message_module_1.MessageModule,
            room_member_module_1.RoomMemberModule,
            socket_io_module_1.SocketIoModule,
            file_uploader_module_1.FileUploaderModule,
            auth_module_1.AuthModule,
            notification_emitter_module_1.NotificationEmitterModule,
            single_room_settings_module_1.SingleRoomSettingsModule,
            group_settings_module_1.GroupSettingsModule,
            broadcast_settings_module_1.BroadcastSettingsModule,
            group_member_module_1.GroupMemberModule,
            broadcast_member_module_1.BroadcastMemberModule,
            room_middleware_module_1.RoomMiddlewareModule,
            app_config_module_1.AppConfigModule,
            group_message_status_module_1.GroupMessageStatusModule,
            user_ban_module_1.UserBanModule,
            order_room_settings_module_1.OrderRoomSettingsModule,
            user_device_module_1.UserDeviceModule
        ],
        exports: [
            channel_service_1.ChannelService
        ]
    })
], ChannelModule);
exports.ChannelModule = ChannelModule;
//# sourceMappingURL=channel.module.js.map