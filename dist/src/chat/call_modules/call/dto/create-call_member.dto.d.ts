import CommonDto from "../../../../core/common/dto/common.dto";
import { MeetPlatform } from "../../../../core/utils/enums";
export declare class CreateCallMemberDto extends CommonDto {
    payload: any;
    roomId: string;
    withVideo: boolean;
    meetPlatform: MeetPlatform;
}
