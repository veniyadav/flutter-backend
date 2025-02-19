"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PushCallDataModel = void 0;
class PushCallDataModel {
    constructor(callId, userName, callerId, userImage, roomId, withVideo, callStatus, roomType, groupName) {
        this.callId = callId;
        this.userName = userName;
        this.callerId = callerId;
        this.userImage = userImage;
        this.roomId = roomId;
        this.withVideo = withVideo;
        this.callStatus = callStatus;
        this.roomType = roomType;
        this.groupName = groupName;
    }
}
exports.PushCallDataModel = PushCallDataModel;
//# sourceMappingURL=push-call-data.model.js.map