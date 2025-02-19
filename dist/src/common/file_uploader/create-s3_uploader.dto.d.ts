/// <reference types="node" />
import CommonDto from "../../core/common/dto/common.dto";
export declare class CreateS3UploaderDto extends CommonDto {
    mediaBuffer: Buffer;
    fileName: String;
}
