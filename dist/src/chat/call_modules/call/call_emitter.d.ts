import { NotificationEmitterService } from "../../../common/notification_emitter/notification_emitter.service";
import { UserService } from "../../../api/user_modules/user/user.service";
import { UserDeviceService } from "../../../api/user_modules/user_device/user_device.service";
import { IMessage } from "../../message/entities/message.entity";
import { GroupMemberService } from "../../group_member/group_member.service";
import { PushCallDataModel } from "../utils/push-call-data.model";
export declare class CallEmitter {
    private readonly emitterService;
    private readonly userService;
    private readonly groupMemberService;
    private readonly userDeviceService;
    private readonly logger;
    constructor(emitterService: NotificationEmitterService, userService: UserService, groupMemberService: GroupMemberService, userDeviceService: UserDeviceService);
    groupRingNotify(model: PushCallDataModel): Promise<void>;
    singleRingNotify(peerId: string, model: PushCallDataModel): Promise<void>;
    singleChatNotification(peerId: string, msg: IMessage): Promise<void>;
    private parseMessageMentions;
    private emitNotification;
    private emitVoip;
}
