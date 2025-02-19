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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailEmitterService = void 0;
const common_1 = require("@nestjs/common");
const date_and_time_1 = __importDefault(require("date-and-time"));
const event_emitter_1 = require("@nestjs/event-emitter");
const interfaceces_1 = require("../../core/utils/interfaceces");
const res_helpers_1 = require("../../core/utils/res.helpers");
let MailEmitterService = class MailEmitterService {
    constructor(eventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    async sendConfirmEmail(user, mailType, isDev) {
        let code = Math.floor(100000 + Math.random() * 900000);
        if (isDev) {
            return code;
        }
        if (user.lastMail && user.lastMail.sendAt) {
            let min = parseInt(date_and_time_1.default.subtract(new Date(), user.lastMail.sendAt).toMinutes().toString(), 10);
            if (min < 2) {
                throw new common_1.BadRequestException(res_helpers_1.i18nApi.wait2MinutesToSendMail);
            }
        }
        let x = new interfaceces_1.SendMailEvent();
        x.code = code.toString();
        x.user = user;
        x.mailType = mailType;
        this.eventEmitter.emit("send.mail", x);
        return code;
    }
};
MailEmitterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_emitter_1.EventEmitter2])
], MailEmitterService);
exports.MailEmitterService = MailEmitterService;
//# sourceMappingURL=mail.emitter.service.js.map