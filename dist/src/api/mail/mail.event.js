"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var MailEvent_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailEvent = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const mailer_1 = require("@nestjs-modules/mailer");
const interfaceces_1 = require("../../core/utils/interfaceces");
const enums_1 = require("../../core/utils/enums");
const app_config_service_1 = require("../app_config/app_config.service");
let MailEvent = MailEvent_1 = class MailEvent {
    constructor(mailerService, appConfig) {
        this.mailerService = mailerService;
        this.appConfig = appConfig;
        this.logger = new common_1.Logger(MailEvent_1.name);
    }
    async handleOrderCreatedEvent(event) {
        let appConfig = await this.appConfig.getConfig();
        try {
            if (event.mailType == enums_1.MailType.ResetPassword) {
                this.mailerService.sendMail({
                    to: event.user.email,
                    subject: appConfig.appName,
                    template: "./password_reset",
                    context: {
                        name: event.user.fullName,
                        code: event.code,
                        appName: appConfig.appName,
                    }
                }).then(value => {
                });
            }
            else {
                await this.mailerService.sendMail({
                    to: event.user.email,
                    subject: appConfig.appName,
                    template: "./confirmation",
                    context: {
                        name: event.user.fullName,
                        code: event.code,
                        appName: appConfig.appName
                    }
                }).then(value => {
                });
            }
        }
        catch (e) {
            this.logger.error(e);
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)("send.mail"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interfaceces_1.SendMailEvent]),
    __metadata("design:returntype", Promise)
], MailEvent.prototype, "handleOrderCreatedEvent", null);
MailEvent = MailEvent_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        app_config_service_1.AppConfigService])
], MailEvent);
exports.MailEvent = MailEvent;
//# sourceMappingURL=mail.event.js.map