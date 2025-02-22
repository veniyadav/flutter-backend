import { MongoRoomIdDto } from "../../../core/common/dto/mongo.room.id.dto";
import { GroupRoleType } from "../../../core/utils/enums";
export declare class UpdateRoleDto extends MongoRoomIdDto {
    peerId: string;
    role: GroupRoleType;
}
