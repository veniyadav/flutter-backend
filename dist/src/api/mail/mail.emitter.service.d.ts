import { EventEmitter2 } from "@nestjs/event-emitter";
import { IUser } from "../user_modules/user/entities/user.entity";
import { MailType } from "../../core/utils/enums";
export declare class MailEmitterService {
    private readonly eventEmitter;
    constructor(eventEmitter: EventEmitter2);
    sendConfirmEmail(user: IUser, mailType: MailType, isDev: boolean): Promise<number>;
}
