import { UserDeviceService } from "../../user_modules/user_device/user_device.service";
import { Platform } from "../../../core/utils/enums";
export declare class UserDeviceAdminService {
    readonly userDeviceService: UserDeviceService;
    constructor(userDeviceService: UserDeviceService);
    getUsersDevicesInfo(): Promise<{
        all: number;
        web: number;
        ios: number;
        mac: number;
        windows: number;
        linux: number;
        android: number;
        other: number;
    }>;
    getTotalVisits(): Promise<any>;
    getUserVisits(id: string): Promise<any>;
    getPlatformVisits(plt: Platform): Promise<any>;
}
