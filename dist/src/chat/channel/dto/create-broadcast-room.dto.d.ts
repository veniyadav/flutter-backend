/// <reference types="node" />
import CommonDto from "../../../core/common/dto/common.dto";
export declare class CreateBroadcastRoomDto extends CommonDto {
    peerIds: any;
    broadcastName: string;
    imageBuffer?: Buffer;
    imgUrl: any;
}
