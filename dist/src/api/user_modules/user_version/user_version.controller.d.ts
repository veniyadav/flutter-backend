import { UserVersionService } from './user_version.service';
import CheckVersionDto from "../../profile/dto/check-version.dto";
export declare class UserVersionController {
    private readonly userVersionService;
    constructor(userVersionService: UserVersionService);
    checkVersion(req: any, dto: CheckVersionDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
}
