"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_module_1 = require("../user_modules/user/user.module");
const user_device_module_1 = require("../user_modules/user_device/user_device.module");
const app_config_module_1 = require("../app_config/app_config.module");
const enums_1 = require("../../core/utils/enums");
const user_country_module_1 = require("../user_modules/user_country/user_country.module");
const file_uploader_module_1 = require("../../common/file_uploader/file_uploader.module");
const notification_emitter_module_1 = require("../../common/notification_emitter/notification_emitter.module");
const mail_emitter_module_1 = require("../mail/mail.emitter.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [auth_service_1.AuthService],
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (args) => {
                    return {
                        secret: "your_secret_key",
                        signOptions: {
                            expiresIn: 1866240000000,
                            subject: enums_1.TokenType.Access,
                            issuer: "lmrhub@gmail.com",
                            algorithm: "HS256",
                            audience: "lmrhub.com"
                        }
                    };
                },
                inject: [config_1.ConfigService]
            }),
            file_uploader_module_1.FileUploaderModule,
            user_module_1.UserModule,
            user_country_module_1.UserCountryModule,
            app_config_module_1.AppConfigModule,
            user_device_module_1.UserDeviceModule,
            notification_emitter_module_1.NotificationEmitterModule,
            mail_emitter_module_1.MailEmitterModule,
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map