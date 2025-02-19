/// <reference types="node" />
import CommonDto from "../../../core/common/dto/common.dto";
export declare class CreateGroupRoomDto extends CommonDto {
    peerIds: any;
    extraData?: any;
    groupName: string;
    groupDescription?: string;
    imageBuffer?: Buffer;
    imgUrl: string;
}
