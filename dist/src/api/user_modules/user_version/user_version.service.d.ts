import CheckVersionDto from "../../profile/dto/check-version.dto";
import { UserDeviceService } from "../user_device/user_device.service";
import { VersionsService } from "../../versions/versions.service";
export declare class UserVersionService {
    private versionsService;
    private userDevice;
    constructor(versionsService: VersionsService, userDevice: UserDeviceService);
    checkVersion(dto: CheckVersionDto): Promise<{
        isNeedUpdates: boolean;
        isCritical: boolean;
        clientVersion: string;
        notes: string;
        serverVersion: string;
        platform: import("../../../core/utils/enums").Platform;
    }>;
}
