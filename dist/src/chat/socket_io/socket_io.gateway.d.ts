import { OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { SocketIoService } from './socket_io.service';
import { Server, Socket } from "socket.io";
import { IUser } from "../../api/user_modules/user/entities/user.entity";
declare module "socket.io" {
    interface Socket {
        user: IUser;
    }
}
export declare class SocketIoGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    private readonly socketIoService;
    io: Server;
    constructor(socketIoService: SocketIoService);
    afterInit(server: any): any;
    handleConnection(client: Socket, ...args: any[]): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    myOnline(data: string, client: Socket): Promise<void>;
    updateRoomMessagesToDeliver(data: any, client: Socket): Promise<void>;
    updateRoomMessagesToSeen(data: any, client: Socket): Promise<void>;
    iceRtc(data: any, client: Socket): Promise<void>;
    roomStatusChanged(data: any, client: Socket): Promise<void>;
}
