import { CountriesService } from "../../../api/countries/countries.service";
import { UserService } from "../../../api/user_modules/user/user.service";
import { AppConfigService } from "../../../api/app_config/app_config.service";
import { VersionsService } from "../../../api/versions/versions.service";
import { CallHistoryService } from "../../../chat/call_modules/call_history/call_history.service";
export declare class FirstRunService {
    private readonly countriesService;
    private readonly userService;
    private readonly callHistoryService;
    private readonly appConfigService;
    private readonly versionsService;
    constructor(countriesService: CountriesService, userService: UserService, callHistoryService: CallHistoryService, appConfigService: AppConfigService, versionsService: VersionsService);
    private _start;
    private _addCountries;
    private _setConfig;
    private _setLastVersion;
    private _closeAllCalls;
    private _insertAdmin;
}
