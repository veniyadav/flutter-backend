"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEmitterModule = void 0;
const common_1 = require("@nestjs/common");
const notification_emitter_service_1 = require("./notification_emitter.service");
const user_device_module_1 = require("../../api/user_modules/user_device/user_device.module");
const user_module_1 = require("../../api/user_modules/user/user.module");
const notification_event_1 = require("./notification.event");
let NotificationEmitterModule = class NotificationEmitterModule {
};
NotificationEmitterModule = __decorate([
    (0, common_1.Module)({
        providers: [notification_event_1.NotificationEvent, notification_emitter_service_1.NotificationEmitterService],
        exports: [notification_emitter_service_1.NotificationEmitterService],
        imports: [
            user_module_1.UserModule,
            user_device_module_1.UserDeviceModule,
        ]
    })
], NotificationEmitterModule);
exports.NotificationEmitterModule = NotificationEmitterModule;
//# sourceMappingURL=notification_emitter.module.js.map