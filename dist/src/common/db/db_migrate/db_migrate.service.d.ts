import { UserService } from "../../../api/user_modules/user/user.service";
import { AppConfigService } from "../../../api/app_config/app_config.service";
export declare class DbMigrateService {
    private readonly userService;
    private readonly appConfigService;
    constructor(userService: UserService, appConfigService: AppConfigService);
    private _startMigrate;
    private _migrateFromVersion1To2;
    private _addUniqueIdForUsers;
    private generateUniqueCode;
    private _mergeBadge;
    private _addUserPrivacy;
}
