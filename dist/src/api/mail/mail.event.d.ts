import { MailerService } from "@nestjs-modules/mailer";
import { SendMailEvent } from "../../core/utils/interfaceces";
import { AppConfigService } from "../app_config/app_config.service";
export declare class MailEvent {
    private mailerService;
    private appConfig;
    private readonly logger;
    constructor(mailerService: MailerService, appConfig: AppConfigService);
    handleOrderCreatedEvent(event: SendMailEvent): Promise<void>;
}
