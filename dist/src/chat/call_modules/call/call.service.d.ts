import { RoomMiddlewareService } from '../../room_middleware/room_middleware.service';
import { IRoomMember } from '../../room_member/entities/room_member.entity';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CreateCallMemberDto } from './dto/create-call_member.dto';
import { AcceptCallMemberDto } from './dto/accept-call_member.dto';
import { CallMemberService } from '../call_member/call_member.service';
import { UserService } from '../../../api/user_modules/user/user.service';
import { SocketIoService } from '../../socket_io/socket_io.service';
import { UserBanService } from '../../../api/user_modules/user_ban/user_ban.service';
import { MessageService } from '../../message/message.service';
import { MongoCallIdDto } from '../../../core/common/dto/mongo.call.id.dto';
import { IUser } from '../../../api/user_modules/user/entities/user.entity';
import { AppConfigService } from '../../../api/app_config/app_config.service';
import { CallEmitter } from './call_emitter';
import { AgoraService } from '../../agora/agora.service';
import { MongoRoomIdDto } from '../../../core/common/dto/mongo.room.id.dto';
import { MongoIdDto } from '../../../core/common/dto/mongo.id.dto';
import { CallHistoryService } from "../call_history/call_history.service";
import { ICallHistory } from "../call_history/call.history.entity";
import { RoomMemberService } from "../../room_member/room_member.service";
import { GroupMemberService } from "../../group_member/group_member.service";
export declare class CallService {
    private readonly userService;
    private readonly callHistory;
    private readonly socket;
    private readonly userBanService;
    private readonly callMemberService;
    private readonly middlewareService;
    private schedulerRegistry;
    private messageService;
    private groupMemberService;
    private appConfigService;
    private ioService;
    private readonly notificationService;
    private readonly roomMember;
    private readonly agoraService;
    constructor(userService: UserService, callHistory: CallHistoryService, socket: SocketIoService, userBanService: UserBanService, callMemberService: CallMemberService, middlewareService: RoomMiddlewareService, schedulerRegistry: SchedulerRegistry, messageService: MessageService, groupMemberService: GroupMemberService, appConfigService: AppConfigService, ioService: SocketIoService, notificationService: CallEmitter, roomMember: RoomMemberService, agoraService: AgoraService);
    createCall(dto: CreateCallMemberDto): Promise<{
        callId: string;
    }>;
    private registerMissedCall;
    private ringForSingle;
    getRingCall(userId: string): Promise<{
        call: ICallHistory;
        roomMember: IRoomMember;
    }>;
    cancelCall(dto: MongoCallIdDto, call: ICallHistory): Promise<string>;
    endCallForSingle(dto: MongoCallIdDto, call: ICallHistory): Promise<string>;
    acceptCall(dto: AcceptCallMemberDto): Promise<{
        callId: string;
    }>;
    rejectCallForSingle(dto: MongoCallIdDto, call: ICallHistory): Promise<string>;
    private _timeoutRing;
    getAgoraAccess(dto: MongoRoomIdDto): Promise<{
        channelName: string;
        uid: number;
        rtcToken: string;
        joinedAt: Date;
    }>;
    endCallV2(dto: MongoCallIdDto): Promise<string>;
    getCallsHistory(user: IUser): Promise<ICallHistory[]>;
    deleteAllHistory(user: IUser): Promise<string>;
    deleteOneHistory(dto: MongoIdDto): Promise<string>;
    isThereRoomMemberAndNotBanedOrThrow(roomId: string, userId: string): Promise<IRoomMember>;
    private createGroupCallNotify;
    private updateCallStatusForUser;
}
