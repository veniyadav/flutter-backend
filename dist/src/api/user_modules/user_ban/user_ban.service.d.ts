/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose-paginate-v2" />
/// <reference types="mongoose-aggregate-paginate-v2" />
import { MongoPeerIdDto } from "../../../core/common/dto/mongo.peer.id.dto";
import { IBan } from "../../ban/entities/ban.entity";
import { UserService } from "../user/user.service";
import { BanService } from "../../ban/ban.service";
import { RoomMemberService } from "../../../chat/room_member/room_member.service";
import { SocketIoService } from "../../../chat/socket_io/socket_io.service";
import { RoomMiddlewareService } from "../../../chat/room_middleware/room_middleware.service";
export declare class UserBanService {
    private readonly userService;
    private readonly banService;
    private readonly roomMember;
    private readonly socketIoService;
    private readonly roomMiddleWar;
    constructor(userService: UserService, banService: BanService, roomMember: RoomMemberService, socketIoService: SocketIoService, roomMiddleWar: RoomMiddlewareService);
    getMyBlockMeOnly(myId: string, dto: Object): Promise<import("mongoose").PaginateResult<import("mongoose").Document<unknown, import("mongoose").PaginateOptions, IBan> & IBan & Required<{
        _id: string;
    }>>>;
    getMyBlockTheyAndMe(myId: string): Promise<string[]>;
    _updateSingleChatBlock(peerIdDto: MongoPeerIdDto, myId: string, toBlock: boolean): Promise<void>;
    getBan(myId: string, peerId: string): Promise<IBan>;
    ban(dto: MongoPeerIdDto): Promise<"You already ban this user" | "you block successfully">;
    unBan(dto: MongoPeerIdDto): Promise<"Already un baned" | "success">;
    checkBans(dto: MongoPeerIdDto): Promise<{
        isMeBanner: boolean;
        isPeerBanner: boolean;
        roomId: string;
    }>;
}
