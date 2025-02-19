/// <reference types="node" />
import CommonDto from "../../../core/common/dto/common.dto";
export declare class CreateAdminNotificationDto extends CommonDto {
    imageBuffer?: Buffer;
    content: string;
    title: string;
    imageUrl?: string;
}
