import { ConfigService } from "@nestjs/config";
export declare class AgoraService {
    private readonly configService;
    constructor(configService: ConfigService);
    getAgoraAccessNew(channelName: string, create: boolean): {
        channelName: string;
        uid: number;
        rtcToken: string;
        joinedAt: Date;
    };
    getAgoraAccess(channelName: string, userId: string, create: boolean): {
        channelName: string;
        uid: number;
        rtcToken: string;
        joinedAt: Date;
    };
}
