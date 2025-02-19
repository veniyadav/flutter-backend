import { ChannelService } from '../services/channel.service';
import { MongoRoomIdDto } from "../../../core/common/dto/mongo.room.id.dto";
import { MongoPeerIdDto } from "../../../core/common/dto/mongo.peer.id.dto";
import { CreateOrderRoomDto } from "../../../core/common/dto/mongo.peer.id.order.id.dto";
export declare class ChannelController {
    private readonly channelService;
    constructor(channelService: ChannelService);
    getRooms(req: any, dto: Object): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getRoomUnReadCount(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getOrCreatePeerRoom(req: any, dto: MongoPeerIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    updateRoomTranslate(req: any, dto: MongoRoomIdDto, transTo: string): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    changeRoomNickName(req: any, dto: MongoRoomIdDto, name: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    stopRoomTranslate(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getRoomById(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getUrlPreview(req: any, dto: MongoRoomIdDto, url: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    deliverRoomMessages(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    muteRoomNotification(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    roomOneSeenOn(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    roomOneSeenOff(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    unMuteRoomNotification(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    archiveRoom(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    unArchiveRoom(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getMySingleChatInfo(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    createOrderRoom(req: any, dto: CreateOrderRoomDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getMyOrderChatInfo(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    deleteRoom(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    clearRoomMessages(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getStarMessages(req: any, dto: Object): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
}
