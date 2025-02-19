import { ProfileService } from "./profile.service";
import { UpdateChatReqStatusDto, UpdateMyBioDto, UpdateMyNameDto, UpdateMyPasswordDto, UpdateMyPrivacyDto } from "./dto/update.my.name.dto";
import UpdatePasswordDto from "./dto/update_password_dto";
import { MongoIdDto } from "../../core/common/dto/mongo.id.dto";
import CheckVersionDto from "./dto/check-version.dto";
import { MongoPeerIdDto } from "../../core/common/dto/mongo.peer.id.dto";
import { CreateReportSystemDto } from "../report_system/dto/create-report_system.dto";
export declare class ProfileController {
    private readonly profileService;
    constructor(profileService: ProfileService);
    getMyProfile(req: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getConfig(req: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getUsersAndSearch(req: any, dto: Object): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getAdminNotification(req: any, dto: Object): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getMyDevice(req: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    deleteDevice(req: any, dto: MongoIdDto, password: string): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateMyName(req: any, dto: UpdateMyNameDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateMyPrivacy(req: any, dto: UpdateMyPrivacyDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getMyBlocked(req: any, dto: Object): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateMyBio(req: any, dto: UpdateMyBioDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateMyPassword(req: any, dto: UpdateMyPasswordDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateMyImage(req: any, file?: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getMyChatRequest(req: any, dto: object): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getPeerProfile(req: any, dto: MongoIdDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    sendChatRequest(req: any, dto: MongoIdDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateChatRequest(req: any, dto: MongoIdDto, status: UpdateChatReqStatusDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    deleteFcm(req: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    addFcm(req: any, pushKey?: string, voipKey?: string): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateFcm(pushKey: String, req: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateLanguage(lang: String, req: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    setVisit(req: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getUserLastSeenAt(req: any, dto: MongoPeerIdDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updatePassword(dto: UpdatePasswordDto, req: any): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    deleteMyAccount(req: any, password: string): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    checkVersion(req: any, dto: CheckVersionDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    createReport(req: any, dto: CreateReportSystemDto): Promise<{
        code: import("../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
}
