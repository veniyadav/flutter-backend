import { ConfigService } from "@nestjs/config";
export declare class AppController {
    private readonly configService;
    constructor(configService: ConfigService);
    servePrivacyPolicy(res: any): any;
    getHello(res: any): string;
}
