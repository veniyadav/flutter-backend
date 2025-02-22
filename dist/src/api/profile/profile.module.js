"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModule = void 0;
const common_1 = require("@nestjs/common");
const profile_service_1 = require("./profile.service");
const profile_controller_1 = require("./profile.controller");
const user_module_1 = require("../user_modules/user/user.module");
const user_device_module_1 = require("../user_modules/user_device/user_device.module");
const auth_module_1 = require("../auth/auth.module");
const versions_module_1 = require("../versions/versions.module");
const file_uploader_module_1 = require("../../common/file_uploader/file_uploader.module");
const user_ban_module_1 = require("../user_modules/user_ban/user_ban.module");
const app_config_module_1 = require("../app_config/app_config.module");
const admin_notification_module_1 = require("../admin_notification/admin_notification.module");
const group_member_module_1 = require("../../chat/group_member/group_member.module");
const broadcast_member_module_1 = require("../../chat/broadcast_member/broadcast_member.module");
const room_member_module_1 = require("../../chat/room_member/room_member.module");
const user_version_module_1 = require("../user_modules/user_version/user_version.module");
const report_system_module_1 = require("../report_system/report_system.module");
const socket_io_module_1 = require("../../chat/socket_io/socket_io.module");
const notification_emitter_module_1 = require("../../common/notification_emitter/notification_emitter.module");
const chat_request_module_1 = require("../../chat/chat_request/chat_request.module");
const channel_module_1 = require("../../chat/channel/channel.module");
const profile_notification_emitter_1 = require("./profile_notification_emitter");
let ProfileModule = class ProfileModule {
};
ProfileModule = __decorate([
    (0, common_1.Module)({
        controllers: [profile_controller_1.ProfileController],
        providers: [profile_service_1.ProfileService, profile_notification_emitter_1.ProfileNotificationEmitter],
        exports: [profile_service_1.ProfileService],
        imports: [
            user_module_1.UserModule,
            file_uploader_module_1.FileUploaderModule,
            user_ban_module_1.UserBanModule,
            auth_module_1.AuthModule,
            user_device_module_1.UserDeviceModule,
            versions_module_1.VersionsModule,
            app_config_module_1.AppConfigModule,
            admin_notification_module_1.AdminNotificationModule,
            group_member_module_1.GroupMemberModule,
            broadcast_member_module_1.BroadcastMemberModule,
            room_member_module_1.RoomMemberModule,
            user_version_module_1.UserVersionModule,
            report_system_module_1.ReportSystemModule,
            socket_io_module_1.SocketIoModule,
            notification_emitter_module_1.NotificationEmitterModule,
            chat_request_module_1.ChatRequestModule,
            channel_module_1.ChannelModule
        ]
    })
], ProfileModule);
exports.ProfileModule = ProfileModule;
//# sourceMappingURL=profile.module.js.map