import CommonDto from "../../../core/common/dto/common.dto";
import { ChatRequestStatus, UserPrivacyTypes } from "../../../core/utils/enums";
export declare class UpdateMyNameDto extends CommonDto {
    fullName: string;
}
export declare class UpdateMyPrivacyDto extends CommonDto {
    startChat: UserPrivacyTypes;
    publicSearch: boolean;
    lastSeen: boolean;
    showStory: UserPrivacyTypes;
}
export declare class UpdateChatReqStatusDto extends CommonDto {
    status: ChatRequestStatus;
}
export declare class UpdateMyBioDto extends CommonDto {
    bio: string;
}
export declare class UpdateMyPasswordDto extends CommonDto {
    oldPassword: string;
    newPassword: string;
    newConfPassword: string;
    logoutAll: boolean;
}
