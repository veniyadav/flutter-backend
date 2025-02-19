"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminPanelModule = void 0;
const common_1 = require("@nestjs/common");
const admin_panel_service_1 = require("./admin_panel.service");
const admin_panel_controller_1 = require("./admin_panel.controller");
const app_config_module_1 = require("../app_config/app_config.module");
const config_1 = require("@nestjs/config");
const notification_emitter_module_1 = require("../../common/notification_emitter/notification_emitter.module");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user_modules/user/user.module");
const file_uploader_module_1 = require("../../common/file_uploader/file_uploader.module");
const user_device_module_1 = require("../user_modules/user_device/user_device.module");
const versions_module_1 = require("../versions/versions.module");
const admin_notification_module_1 = require("../admin_notification/admin_notification.module");
const user_country_module_1 = require("../user_modules/user_country/user_country.module");
const notification_emitter_admin_service_1 = require("./other/notification_emitter_admin.service");
const user_admin_service_1 = require("./other/user_admin.service");
const user_country_admin_service_1 = require("./other/user_country_admin.service");
const user_device_admin_service_1 = require("./other/user_device_admin.service");
const versions_admin_service_1 = require("./other/versions_admin.service");
const socket_io_module_1 = require("../../chat/socket_io/socket_io.module");
const channel_module_1 = require("../../chat/channel/channel.module");
const channel_admin_service_1 = require("./other/channel_admin_service");
const room_member_module_1 = require("../../chat/room_member/room_member.module");
const single_room_settings_module_1 = require("../../chat/single_room_settings/single_room_settings.module");
const group_settings_module_1 = require("../../chat/group_settings/group_settings.module");
const broadcast_settings_module_1 = require("../../chat/broadcast_settings/broadcast_settings.module");
const order_room_settings_module_1 = require("../../chat/order_room_settings/order_room_settings.module");
const message_module_1 = require("../../chat/message/message.module");
const report_system_module_1 = require("../report_system/report_system.module");
let AdminPanelModule = class AdminPanelModule {
};
AdminPanelModule = __decorate([
    (0, common_1.Module)({
        controllers: [admin_panel_controller_1.AdminPanelController],
        providers: [
            admin_panel_service_1.AdminPanelService,
            notification_emitter_admin_service_1.NotificationEmitterAdminService,
            user_admin_service_1.UserAdminService,
            user_country_admin_service_1.UserCountryAdminService,
            user_device_admin_service_1.UserDeviceAdminService,
            versions_admin_service_1.VersionsAdminService,
            channel_admin_service_1.ChannelAdminService
        ],
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            file_uploader_module_1.FileUploaderModule,
            notification_emitter_module_1.NotificationEmitterModule,
            config_1.ConfigModule,
            app_config_module_1.AppConfigModule,
            user_device_module_1.UserDeviceModule,
            versions_module_1.VersionsModule,
            admin_notification_module_1.AdminNotificationModule,
            user_country_module_1.UserCountryModule,
            socket_io_module_1.SocketIoModule,
            channel_module_1.ChannelModule,
            room_member_module_1.RoomMemberModule,
            single_room_settings_module_1.SingleRoomSettingsModule,
            group_settings_module_1.GroupSettingsModule,
            broadcast_settings_module_1.BroadcastSettingsModule,
            message_module_1.MessageModule,
            order_room_settings_module_1.OrderRoomSettingsModule,
            report_system_module_1.ReportSystemModule
        ]
    })
], AdminPanelModule);
exports.AdminPanelModule = AdminPanelModule;
//# sourceMappingURL=admin_panel.module.js.map