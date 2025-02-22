import { GroupChannelService } from "../services/group.channel.service";
import { UpdateRoleDto } from "../dto/update.role.dto";
import { CreateGroupRoomDto } from "../dto/create-group-room.dto";
import { KickMembersDto } from "../dto/kick.members.dto";
import mongoose from "mongoose";
import { MessageStatusParamDto } from "../dto/message_status_param_dto";
import { MongoRoomIdDto } from "../../../core/common/dto/mongo.room.id.dto";
import { MongoIdsDto } from "../../../core/common/dto/mongo.ids.dto";
import { DefaultPaginateParams } from "../../../core/common/dto/paginateDto";
import { UsersSearchDto } from "../dto/users_search_dto";
export declare class GroupChannelController {
    private readonly groupService;
    private readonly connection;
    constructor(groupService: GroupChannelService, connection: mongoose.Connection);
    createGroupChat(req: any, dto: CreateGroupRoomDto, file?: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    addMembersToGroup(req: any, gId: MongoRoomIdDto, dto: MongoIdsDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateUserRole(req: any, dto: UpdateRoleDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getGroupMessageInfo(req: any, dto: MessageStatusParamDto, paginateParams: DefaultPaginateParams): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getMyGroupInfo(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateGroupExtraData(req: any, dto: MongoRoomIdDto, data: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getMyGroupStatus(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getGroupMembers(req: any, mongoDto: MongoRoomIdDto, dto: UsersSearchDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    kickGroupMember(req: any, dto: KickMembersDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    leaveGroupChat(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateTitle(req: any, dto: MongoRoomIdDto, title?: string): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateDescription(req: any, dto: MongoRoomIdDto, description?: string): Promise<{
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
