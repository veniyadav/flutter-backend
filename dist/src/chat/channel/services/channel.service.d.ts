import { OneFullRoomModel } from "../chat.helper";
import * as mongoose from "mongoose";
import { RoomMemberService } from "../../room_member/room_member.service";
import { MessageService } from "../../message/message.service";
import { UserService } from "../../../api/user_modules/user/user.service";
import { UserBanService } from "../../../api/user_modules/user_ban/user_ban.service";
import { SingleRoomSettingsService } from "../../single_room_settings/single_room_settings.service";
import { OrderRoomSettingsService } from "../../order_room_settings/single_room_settings.service";
import { SocketIoService } from "../../socket_io/socket_io.service";
import { RoomMiddlewareService } from "../../room_middleware/room_middleware.service";
import { MongoPeerIdDto } from "../../../core/common/dto/mongo.peer.id.dto";
import { CreateOrderRoomDto } from "../../../core/common/dto/mongo.peer.id.order.id.dto";
import { MongoRoomIdDto } from "../../../core/common/dto/mongo.room.id.dto";
import { IRoomMember } from "../../room_member/entities/room_member.entity";
export declare class ChannelService {
    private readonly roomMemberService;
    private readonly messageService;
    private readonly userService;
    private readonly singleRoomSetting;
    private readonly orderRoomSetting;
    private readonly socket;
    private readonly middlewareService;
    private readonly userBan;
    constructor(roomMemberService: RoomMemberService, messageService: MessageService, userService: UserService, singleRoomSetting: SingleRoomSettingsService, orderRoomSetting: OrderRoomSettingsService, socket: SocketIoService, middlewareService: RoomMiddlewareService, userBan: UserBanService);
    _getOneFullRoomModel(dto: OneFullRoomModel): Promise<any>;
    getOrCreatePeerRoom(dto: MongoPeerIdDto, session?: mongoose.ClientSession): Promise<any>;
    createOrderRoom(dto: CreateOrderRoomDto): Promise<any>;
    updateRoomTranslate(dto: MongoRoomIdDto, transTo: string): Promise<IRoomMember>;
    stopRoomTranslate(dto: MongoRoomIdDto): Promise<IRoomMember>;
    getRoomsLimited(dto: Object, userId: string): Promise<any>;
    getRoomById(dto: MongoRoomIdDto): Promise<any>;
    deliverRoomMessages(dto: MongoRoomIdDto): Promise<{
        isUpdated: boolean;
    }>;
    changeNickName(dto: MongoRoomIdDto, name?: string): Promise<string>;
    muteRoomNotification(dto: MongoRoomIdDto): Promise<string>;
    unMuteRoomNotification(dto: MongoRoomIdDto): Promise<string>;
    deleteRoom(dto: MongoRoomIdDto): Promise<string>;
    getMySingleChatInfo(dto: MongoRoomIdDto): Promise<{
        banned: boolean;
        bannerId: any;
    }>;
    getMyOrderChatInfo(dto: MongoRoomIdDto): Promise<{}>;
    getRoomUnReadCount(dto: MongoRoomIdDto): Promise<number>;
    archiveRoom(dto: MongoRoomIdDto): Promise<string>;
    unArchiveRoom(dto: MongoRoomIdDto): Promise<string>;
    getStarMessages(dto: Object, myId: string): Promise<{
        docs: (mongoose.Document<unknown, {}, import("../../message/entities/message.entity").IMessage> & import("../../message/entities/message.entity").IMessage & {
            _id: mongoose.Types.ObjectId;
        })[];
    }>;
    clearRoomMessages(dto: MongoRoomIdDto): Promise<string>;
    getUrlPreview(dto: MongoRoomIdDto, url: string): Promise<{
        url: string;
        mediaType: string;
        contentType: string;
        favicons: string[];
    } | {
        url: string;
        title: string;
        siteName: string;
        description: string;
        mediaType: string;
        contentType: string;
        images: string[];
        videos: {
            url: string;
            secureUrl: string;
            type: string;
            width: string;
            height: string;
        }[];
        favicons: string[];
    }>;
    roomOneSeenOn(dto: MongoRoomIdDto): Promise<string>;
    roomOneSeenOff(dto: MongoRoomIdDto): Promise<string>;
    private getChannelStagesV3;
}
