import { KickMembersDto } from "../dto/kick.members.dto";
import { BroadcastChannelService } from "../services/broadcast.channel.service";
import { CreateBroadcastRoomDto } from "../dto/create-broadcast-room.dto";
import { MessageStatusParamDto } from "../dto/message_status_param_dto";
import { MongoRoomIdDto } from "../../../core/common/dto/mongo.room.id.dto";
import { MongoIdsDto } from "../../../core/common/dto/mongo.ids.dto";
import { UsersSearchDto } from "../dto/users_search_dto";
import { DefaultPaginateParams } from "../../../core/common/dto/paginateDto";
export declare class BroadcastChannelController {
    private readonly broadcastService;
    constructor(broadcastService: BroadcastChannelService);
    createBroadcastChat(req: any, dto: CreateBroadcastRoomDto, file?: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    addMembersToBroadcast(req: any, bId: MongoRoomIdDto, dto: MongoIdsDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getBroadcastMembers(req: any, mongoDto: MongoRoomIdDto, dto: UsersSearchDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getBroadcastMyInfo(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getBroadcastMessageInfo(req: any, dto: MessageStatusParamDto, paginateParams: DefaultPaginateParams): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    kickBroadcastMember(req: any, dto: KickMembersDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateTitle(req: any, dto: MongoRoomIdDto, title?: string): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateImage(req: any, dto: MongoRoomIdDto, file?: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getAvailableUsersToAdd(req: any, dto: Object, roomId: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
}
