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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileNotificationEmitter = void 0;
const common_1 = require("@nestjs/common");
const notification_emitter_service_1 = require("../../common/notification_emitter/notification_emitter.service");
const user_service_1 = require("../user_modules/user/user.service");
const user_device_service_1 = require("../user_modules/user_device/user_device.service");
const interfaceces_1 = require("../../core/utils/interfaceces");
const enums_1 = require("../../core/utils/enums");
let ProfileNotificationEmitter = class ProfileNotificationEmitter {
    constructor(emitterService, userService, userDevice) {
        this.emitterService = emitterService;
        this.userService = userService;
        this.userDevice = userDevice;
    }
    async notify(peerId, myUser) {
        let tokens = new interfaceces_1.PushKeyAndProvider([], [], []);
        let devices = await this.userDevice.getUserPushTokens(peerId);
        tokens.fcm = devices.fcm;
        tokens.oneSignal = devices.oneSignal;
        this.emit({
            data: {
                type: enums_1.NotificationType.ChatReq,
                fromVChat: "true"
            },
            tag: myUser._id.toString(),
            body: "💬 Chat Request 💬",
            title: myUser.fullName,
            tokens: []
        }, tokens);
    }
    emit(notificationData, tokens) {
        if (tokens.fcm.length != 0) {
            notificationData.tokens = tokens.fcm;
            this.emitterService.fcmSend(notificationData);
        }
        if (tokens.oneSignal.length != 0) {
            notificationData.tokens = tokens.oneSignal;
            this.emitterService.oneSignalSend(notificationData);
        }
    }
};
ProfileNotificationEmitter = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_emitter_service_1.NotificationEmitterService,
        user_service_1.UserService,
        user_device_service_1.UserDeviceService])
], ProfileNotificationEmitter);
exports.ProfileNotificationEmitter = ProfileNotificationEmitter;
//# sourceMappingURL=profile_notification_emitter.js.map