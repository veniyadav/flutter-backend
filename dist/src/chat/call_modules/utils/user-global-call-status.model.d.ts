export declare class UserGlobalCallStatus {
    readonly isCaller: boolean;
    readonly callId?: string;
    readonly callerId?: string;
    readonly roomId?: string;
    readonly createdAt?: Date;
    constructor(isCaller?: boolean, callId?: any, callerId?: any, roomId?: any, createdAt?: any);
    static createEmpty(): UserGlobalCallStatus;
    toJSON(): {
        isCaller: boolean;
        callId: string;
        callerId: string;
        roomId: string;
        createdAt: Date;
    };
}
