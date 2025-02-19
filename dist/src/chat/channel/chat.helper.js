"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMsgDtoObj = void 0;
const uuid_1 = require("uuid");
const send_message_dto_1 = require("./dto/send.message.dto");
function getMsgDtoObj(dto) {
    let obj = new send_message_dto_1.SendMessageDto();
    obj.messageType = dto.mT;
    obj.content = dto.content;
    obj.myUser = dto.user;
    obj._id = dto._id;
    obj._pBId = dto._pBId;
    obj._peerData = dto.peerData;
    obj._platform = dto.user.currentDevice.platform;
    obj._messageAttachment = dto.att;
    obj.localId = dto.localId ?? (0, uuid_1.v4)();
    obj._roomId = dto.rId;
    obj.isOneSeen = false;
    return obj;
}
exports.getMsgDtoObj = getMsgDtoObj;
//# sourceMappingURL=chat.helper.js.map