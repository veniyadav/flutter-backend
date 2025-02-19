import { UserCountryService } from "../../user_modules/user_country/user_country.service";
export declare class UserCountryAdminService {
    readonly userCountryService: UserCountryService;
    constructor(userCountryService: UserCountryService);
    getUserCountries(id: string): Promise<any[]>;
    getCountriesInfo(): Promise<any[]>;
}
