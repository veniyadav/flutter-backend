import { Server, Socket } from "socket.io";
import { RemoteSocket } from "socket.io/dist/broadcast-operator";
import { CallMemberService } from "../call_modules/call_member/call_member.service";
import { RoomMemberService } from "../room_member/room_member.service";
import { MessageService } from "../message/message.service";
import { UserService } from "../../api/user_modules/user/user.service";
import { RoomMiddlewareService } from "../room_middleware/room_middleware.service";
import { IUser } from "../../api/user_modules/user/entities/user.entity";
import { UserDeviceService } from "../../api/user_modules/user_device/user_device.service";
export declare class SocketIoService {
    private readonly roomMemberService;
    private readonly messageService;
    private readonly userService;
    private readonly deviceService;
    private readonly callMemberService;
    private readonly middlewareService;
    private readonly userDeviceService;
    io: Server;
    constructor(roomMemberService: RoomMemberService, messageService: MessageService, userService: UserService, deviceService: UserDeviceService, callMemberService: CallMemberService, middlewareService: RoomMiddlewareService, userDeviceService: UserDeviceService);
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    joinRoom(args: {
        usersIds: any[];
        roomId: string;
    }): Promise<number>;
    leaveRooms(args: {
        usersIds: any[];
        roomId: any;
    }): Promise<number>;
    getOnlineSocketsNumber(): Promise<number>;
    getSockets(usersIds: any[]): Promise<any[]>;
    getSocketByDeviceId(deviceId: string): Promise<RemoteSocket<any, any>>;
    getOnlineRoomId(roomId: string): Promise<number>;
    getOnlineFromList(usersIds: string[]): Promise<any[]>;
    checkIfUserOnline(userId: string): Promise<boolean>;
    leaveRoom(roomId: string, uId: string): Promise<void>;
    myOnline(decodedList: any[]): Promise<any[]>;
    updateRoomMessagesToDeliver(roomId: any, myUser: IUser): Promise<{
        isUpdated: boolean;
        pId: string;
    }>;
    updateRoomMessagesToSeen(roomId: any, myUser: IUser): Promise<{
        isUpdated: boolean;
        pId: string;
    }>;
    handleDisconnect(client: Socket): Promise<void>;
    kickGroupMember(gId: string, peerId: string): Promise<void>;
    private _checkIfThisDeviceInCall;
    iceRtc(meetId: string, client: Socket): Promise<void>;
    private _setLastSeenAt;
}
