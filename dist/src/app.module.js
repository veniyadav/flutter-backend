"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const user_module_1 = require("./api/user_modules/user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const throttler_1 = require("@nestjs/throttler");
const config_1 = require("@nestjs/config");
const event_emitter_1 = require("@nestjs/event-emitter");
const user_device_module_1 = require("./api/user_modules/user_device/user_device.module");
const path_1 = __importDefault(require("path"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const core_1 = require("@nestjs/core");
const all_exception_filter_1 = require("./core/exception_filter/all-exception.filter");
const countries_module_1 = require("./api/countries/countries.module");
const user_country_module_1 = require("./api/user_modules/user_country/user_country.module");
const versions_module_1 = require("./api/versions/versions.module");
const app_config_module_1 = require("./api/app_config/app_config.module");
const auth_module_1 = require("./api/auth/auth.module");
const file_uploader_module_1 = require("./common/file_uploader/file_uploader.module");
const profile_module_1 = require("./api/profile/profile.module");
const user_ban_module_1 = require("./api/user_modules/user_ban/user_ban.module");
const ban_module_1 = require("./api/ban/ban.module");
const user_version_module_1 = require("./api/user_modules/user_version/user_version.module");
const admin_notification_module_1 = require("./api/admin_notification/admin_notification.module");
const admin_panel_module_1 = require("./api/admin_panel/admin_panel.module");
const report_system_module_1 = require("./api/report_system/report_system.module");
const notification_emitter_module_1 = require("./common/notification_emitter/notification_emitter.module");
const socket_io_module_1 = require("./chat/socket_io/socket_io.module");
const group_message_status_module_1 = require("./chat/group_message_status/group_message_status.module");
const message_module_1 = require("./chat/message/message.module");
const group_settings_module_1 = require("./chat/group_settings/group_settings.module");
const group_member_module_1 = require("./chat/group_member/group_member.module");
const broadcast_settings_module_1 = require("./chat/broadcast_settings/broadcast_settings.module");
const broadcast_member_module_1 = require("./chat/broadcast_member/broadcast_member.module");
const order_room_settings_module_1 = require("./chat/order_room_settings/order_room_settings.module");
const single_room_settings_module_1 = require("./chat/single_room_settings/single_room_settings.module");
const room_member_module_1 = require("./chat/room_member/room_member.module");
const room_middleware_module_1 = require("./chat/room_middleware/room_middleware.module");
const channel_module_1 = require("./chat/channel/channel.module");
const call_member_module_1 = require("./chat/call_modules/call_member/call_member.module");
const call_module_1 = require("./chat/call_modules/call/call.module");
const schedule_1 = require("@nestjs/schedule");
const mail_emitter_module_1 = require("./api/mail/mail.emitter.module");
const agora_module_1 = require("./chat/agora/agora.module");
const story_module_1 = require("./api/stories/story/story.module");
const user_story_module_1 = require("./api/stories/user_story/user_story.module");
const db_migrate_module_1 = require("./common/db/db_migrate/db_migrate.module");
const first_run_module_1 = require("./common/db/first_run/first_run.module");
const chat_request_module_1 = require("./chat/chat_request/chat_request.module");
const story_attachment_module_1 = require("./api/stories/story_attachment/story_attachment.module");
const call_history_module_1 = require("./chat/call_modules/call_history/call_history.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            schedule_1.ScheduleModule.forRoot(),
            event_emitter_1.EventEmitterModule.forRoot(),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                ignoreEnvFile: process.env.ignoreEnvFile == "true",
                envFilePath: path_1.default.join(app_root_path_1.default.path, ".env." + process.env.NODE_ENV)
            }),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60 * 5,
                limit: 800,
                ignoreUserAgents: [/googlebot/gi, /bingbot/gi, /baidubot/gi]
            }),
            mongoose_1.MongooseModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: async (conf) => {
                    return {
                        uri: "mongodb+srv://demo:RKFyw77dzw8dvTdz@cluster0.ljji9.mongodb.net/flutter-backend"
                    };
                }
            }),
            user_device_module_1.UserDeviceModule,
            countries_module_1.CountriesModule,
            user_country_module_1.UserCountryModule,
            mail_emitter_module_1.MailEmitterModule,
            versions_module_1.VersionsModule,
            app_config_module_1.AppConfigModule,
            auth_module_1.AuthModule,
            file_uploader_module_1.FileUploaderModule,
            profile_module_1.ProfileModule,
            user_ban_module_1.UserBanModule,
            ban_module_1.BanModule,
            user_version_module_1.UserVersionModule,
            admin_notification_module_1.AdminNotificationModule,
            admin_panel_module_1.AdminPanelModule,
            report_system_module_1.ReportSystemModule,
            notification_emitter_module_1.NotificationEmitterModule,
            socket_io_module_1.SocketIoModule,
            group_message_status_module_1.GroupMessageStatusModule,
            message_module_1.MessageModule,
            group_settings_module_1.GroupSettingsModule,
            group_member_module_1.GroupMemberModule,
            broadcast_settings_module_1.BroadcastSettingsModule,
            broadcast_member_module_1.BroadcastMemberModule,
            order_room_settings_module_1.OrderRoomSettingsModule,
            single_room_settings_module_1.SingleRoomSettingsModule,
            room_member_module_1.RoomMemberModule,
            room_middleware_module_1.RoomMiddlewareModule,
            call_member_module_1.CallMemberModule,
            call_module_1.CallModule,
            channel_module_1.ChannelModule,
            agora_module_1.AgoraModule,
            story_module_1.StoryModule,
            user_story_module_1.UserStoryModule,
            first_run_module_1.FirstRunModule,
            db_migrate_module_1.DbMigrateModule,
            chat_request_module_1.ChatRequestModule,
            story_attachment_module_1.StoryAttachmentModule,
            call_history_module_1.CallHistoryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: all_exception_filter_1.AllExceptionFilter
            },
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map