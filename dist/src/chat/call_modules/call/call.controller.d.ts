import { CreateCallMemberDto } from "./dto/create-call_member.dto";
import { AcceptCallMemberDto } from "./dto/accept-call_member.dto";
import { CallService } from "./call.service";
import { MongoRoomIdDto } from "../../../core/common/dto/mongo.room.id.dto";
import { MongoIdDto } from "../../../core/common/dto/mongo.id.dto";
import { MongoCallIdDto } from "../../../core/common/dto/mongo.call.id.dto";
export declare class CallController {
    private readonly callService;
    constructor(callService: CallService);
    createCall(req: any, roomIdDto: MongoRoomIdDto, dto: CreateCallMemberDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getRingCall(req: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getAgoraAccess(req: any, dto: MongoRoomIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    acceptCall(req: any, meetIdDto: MongoCallIdDto, dto: AcceptCallMemberDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    endCallV2(req: any, dto: MongoCallIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    getCallsHistory(req: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    deleteAllHistory(req: any): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
    deleteOneHistory(req: any, dto: MongoIdDto): Promise<{
        code: import("../../../core/utils/res.helpers").ApiCode;
        data: any;
        msg: null;
    }>;
}
