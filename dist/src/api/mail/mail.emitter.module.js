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
exports.MailEmitterModule = void 0;
const common_1 = require("@nestjs/common");
const mail_emitter_service_1 = require("./mail.emitter.service");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const path_1 = require("path");
const mail_event_1 = require("./mail.event");
const app_config_module_1 = require("../app_config/app_config.module");
const app_root_path_1 = __importDefault(require("app-root-path"));
let MailEmitterModule = class MailEmitterModule {
};
MailEmitterModule = __decorate([
    (0, common_1.Module)({
        providers: [mail_emitter_service_1.MailEmitterService, mail_event_1.MailEvent],
        imports: [
            mailer_1.MailerModule.forRootAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: async (config) => ({
                    transport: {
                        host: "smtp.gmail.com",
                        secure: true,
                        port: 465,
                        auth: {
                            user: "rehanmultanikiaantech@gmail.com",
                            pass: "eldr dfpq ffia okmb",
                        },
                        debug: true,
                        logger: false,
                    },
                    defaults: {
                        from: `"No Reply" <${"rehanmultanikiaantech@gmail.com"}>`,
                    },
                    template: {
                        dir: (0, path_1.join)(app_root_path_1.default.path, "dist", "api", "mail", "templates"),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true,
                        },
                    },
                }),
            }),
            app_config_module_1.AppConfigModule
        ],
        exports: [mail_emitter_service_1.MailEmitterService],
    })
], MailEmitterModule);
exports.MailEmitterModule = MailEmitterModule;
//# sourceMappingURL=mail.emitter.module.js.map