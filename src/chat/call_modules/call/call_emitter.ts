import { Injectable, Logger } from "@nestjs/common";
import { NotificationEmitterService, rExp } from "../../../common/notification_emitter/notification_emitter.service";
import { UserService } from "../../../api/user_modules/user/user.service";
import { UserDeviceService } from "../../../api/user_modules/user_device/user_device.service";
import { NotificationData } from "../../../common/notification_emitter/notification.event";
import { IMessage } from "../../message/entities/message.entity";
import { NotificationType, Platform } from "../../../core/utils/enums";
import { PushKeyAndProvider } from "../../../core/utils/interfaceces";
import { GroupMemberService } from "../../group_member/group_member.service";
import { PushCallDataModel } from "../utils/push-call-data.model";

@Injectable()
export class CallEmitter {
    private readonly logger = new Logger(CallEmitter.name);

    constructor(
        private readonly emitterService: NotificationEmitterService,
        private readonly userService: UserService,
        private readonly groupMemberService: GroupMemberService,
        private readonly userDeviceService: UserDeviceService,
    ) {}

    async groupRingNotify(model: PushCallDataModel) {
        try {
            const tokens = new PushKeyAndProvider([], [], []);
            const groupId = model.roomId;
            const members = await this.groupMemberService.findAll({
                rId: groupId,
                uId: { $ne: model.callerId }
            }, "uId");

            for (const member of members) {
                const androidDevices = await this.userDeviceService.getUserPushTokens(member.uId, Platform.Android);
                tokens.fcm.push(...androidDevices.fcm);
                tokens.oneSignal.push(...androidDevices.oneSignal);
                const iosDevices = await this.userDeviceService.getUserPushTokens(member.uId, Platform.Ios);
                tokens.voipKeys.push(...iosDevices.voipKeys);
            }

            this.emitNotification({
                data: {
                    type: NotificationType.Call,
                    fromVChat: "true",
                    callData: JSON.stringify(model)
                },
                tag: "",
                body: "NEW CALL",
                title: "NEW CALL",
                sound: "ringtone",
               // isSilent: true,
                tokens: []
            }, tokens);

            this.emitVoip(model, tokens.voipKeys);
        } catch (error) {
            this.logger.error("Error sending group ring notification", error);
        }
    }

    async singleRingNotify(peerId: string, model: PushCallDataModel) {
        try {
            const tokens = new PushKeyAndProvider([], [], []);
            const androidDevices = await this.userDeviceService.getUserPushTokens(peerId, Platform.Android);
            tokens.fcm = androidDevices.fcm;
            tokens.oneSignal = androidDevices.oneSignal;
            const iosDevices = await this.userDeviceService.getUserPushTokens(peerId, Platform.Ios);
            tokens.voipKeys = iosDevices.voipKeys;

            this.emitNotification({
                data: {
                    type: NotificationType.Call,
                    fromVChat: "true",
                    callData: JSON.stringify(model)
                },
                tag: "",
                body: "NEW CALL",
                title: "NEW CALL",
                sound: "ringtone",
               // isSilent: true,
                tokens: []
            }, tokens);

            this.emitVoip(model, tokens.voipKeys);
        } catch (error) {
            this.logger.error("Error sending single ring notification", error);
        }
    }

    async singleChatNotification(peerId: string, msg: IMessage) {
        try {
            const tokens = new PushKeyAndProvider([], [], []);
            const devices = await this.userDeviceService.getUserPushTokens(peerId);
            tokens.fcm = devices.fcm;
            tokens.oneSignal = devices.oneSignal;

            this.emitNotification({
                data: {
                    type: NotificationType.SingleChat,
                    vMessage: JSON.stringify(msg),
                    fromVChat: "true"
                },
                tag: msg.rId,
                body: this.parseMessageMentions(msg.c),
                title: msg.sName,
                tokens: []
            }, tokens);
        } catch (error) {
            this.logger.error("Error sending single chat notification", error);
        }
    }

    private parseMessageMentions(body: string): string {
        return body.replace(rExp, substring => {
            try {
                return substring.split(":")[0].substring(1);
            } catch (e) {
                return substring;
            }
        });
    }

    private emitNotification(notificationData: NotificationData, tokens: PushKeyAndProvider) {
        if (tokens.fcm.length > 0) {
            notificationData.tokens = tokens.fcm;
            this.emitterService.fcmSend(notificationData);
        }
        if (tokens.oneSignal.length > 0) {
            notificationData.tokens = tokens.oneSignal;
            this.emitterService.oneSignalSend(notificationData);
        }
    }

    private emitVoip(model: PushCallDataModel, voipKeys: any[]) {
        if (voipKeys.length === 0) return;
        //this.emitterService.sendVoipCall(voipKeys, model);
    }
}
