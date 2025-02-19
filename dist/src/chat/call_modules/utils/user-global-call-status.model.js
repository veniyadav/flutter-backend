"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGlobalCallStatus = void 0;
class UserGlobalCallStatus {
    constructor(isCaller = false, callId = null, callerId = null, roomId = null, createdAt = null) {
        this.isCaller = isCaller;
        this.callId = callId;
        this.roomId = roomId;
        this.callerId = callerId;
        this.createdAt = createdAt;
    }
    static createEmpty() {
        return new UserGlobalCallStatus();
    }
    toJSON() {
        return {
            isCaller: this.isCaller,
            callId: this.callId,
            callerId: this.callerId,
            roomId: this.roomId,
            createdAt: this.createdAt,
        };
    }
}
exports.UserGlobalCallStatus = UserGlobalCallStatus;
//# sourceMappingURL=user-global-call-status.model.js.map