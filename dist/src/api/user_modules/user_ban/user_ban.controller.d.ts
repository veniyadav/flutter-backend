import { UserBanService } from './user_ban.service';
import { MongoPeerIdDto } from "../../../core/common/dto/mongo.peer.id.dto";
export declare class UserBanController {
    private readonly userBanService;
    constructor(userBanService: UserBanService);
    ban(dto: MongoPeerIdDto, req: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    checkBans(dto: MongoPeerIdDto, req: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    unBan(dto: MongoPeerIdDto, req: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
}
