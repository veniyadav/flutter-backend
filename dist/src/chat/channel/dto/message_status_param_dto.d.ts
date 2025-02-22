import { RoomIdAndMsgIdDto } from "../../../core/common/dto/room.id.and.msg.id.dto";
import { MessageStatusType } from "../../../core/utils/enums";
export declare class MessageStatusParamDto extends RoomIdAndMsgIdDto {
    type: MessageStatusType;
}
