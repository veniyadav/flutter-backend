import { MessageChannelService } from "../services/message.channel.service";
import { SendMessageDto } from "../dto/send.message.dto";
import { DeleteMessageDto } from "../dto/delete.message.dto";
import { MongoRoomIdDto } from "../../../core/common/dto/mongo.room.id.dto";
import { MessagesSearchDto } from "../../message/dto/messages_search_dto";
import { RoomIdAndMsgIdDto } from "../../../core/common/dto/room.id.and.msg.id.dto";
export declare class MessageChannelController {
    private readonly channelMessageService;
    constructor(channelMessageService: MessageChannelService);
    createMessage(req: any, roomDtoId: MongoRoomIdDto, dto: SendMessageDto, file?: any[]): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    deleteRoomMessage(req: any, dto: DeleteMessageDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    starRoomMessage(req: any, dto: RoomIdAndMsgIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    unStarRoomMessage(req: any, dto: RoomIdAndMsgIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getMyAllStarMessages(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getRoomMessages(req: any, paramDto: MongoRoomIdDto, dto: MessagesSearchDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    oneSeeThisMessage(req: any, dto: RoomIdAndMsgIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
}
