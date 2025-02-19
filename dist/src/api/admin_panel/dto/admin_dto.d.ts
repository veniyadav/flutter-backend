import { MongoIdDto } from "../../../core/common/dto/mongo.id.dto";
import { Platform } from "../../../core/utils/enums";
import CommonDto from "../../../core/common/dto/common.dto";
export declare class BanToDto extends MongoIdDto {
    banTo: string;
}
export declare class CreateNewVersionDto {
    semVer: string;
    notify: boolean;
    notes: string;
    platform: Platform;
    critical: boolean;
}
export declare class GetVersionDto extends CommonDto {
    platform: Platform;
}
