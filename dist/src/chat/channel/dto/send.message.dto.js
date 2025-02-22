"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageDto = void 0;
const class_validator_1 = require("class-validator");
const enums_1 = require("../../../core/utils/enums");
const common_dto_1 = __importDefault(require("../../../core/common/dto/common.dto"));
const app_validator_1 = require("../../../core/utils/app.validator");
class SendMessageDto extends common_dto_1.default {
    toJson() {
        let x = {
            _id: this._id,
            sId: this.myUser._id,
            sName: this.myUser.fullName,
            sImg: this.myUser.userImage,
            plm: this._platform,
            rId: this._roomId,
            isOneSeen: this.isOneSeen,
            forId: this.forwardLocalId,
            linkAtt: this.linkAtt ? JSON.parse(this.linkAtt) : null,
            c: this.content,
            mT: this.messageType,
            mentions: this.mentions,
            isEncrypted: this.isEncrypted == "true",
            pBId: this._pBId,
            rTo: this._replyTo ? (0, app_validator_1.jsonDecoder)(this._replyTo) : null,
            msgAtt: this._messageAttachment,
            lId: this.localId,
            peerData: this._peerData ? { ...this._peerData } : null
        };
        return x;
    }
    isImage() {
        if (this.messageType == enums_1.MessageType.Image) {
            return true;
        }
    }
    isVideo() {
        if (this.messageType == enums_1.MessageType.Video) {
            return true;
        }
    }
    isVoice() {
        if (this.messageType == enums_1.MessageType.Voice) {
            return true;
        }
    }
    isFile() {
        if (this.messageType == enums_1.MessageType.File) {
            return true;
        }
    }
    isText() {
        if (this.messageType == enums_1.MessageType.Text) {
            return true;
        }
    }
    isLocation() {
        if (this.messageType == enums_1.MessageType.Location) {
            return true;
        }
    }
    isInfo() {
        if (this.messageType == enums_1.MessageType.Info) {
            return true;
        }
    }
    isEncryptedMessage() {
        return this.isEncrypted;
    }
    isCustom() {
        if (this.messageType == enums_1.MessageType.Custom) {
            return true;
        }
    }
    isRequireFile() {
        if (this.forwardLocalId) {
            return false;
        }
        return this.isImage() || this.isFile() || this.isVoice() || this.isVideo();
    }
    isRequireAttachment() {
        return this.isVideo() || this.isLocation() || this.isVoice();
    }
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "localId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enums_1.MessageType),
    __metadata("design:type", String)
], SendMessageDto.prototype, "messageType", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object["isEncrypted"]),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "isEncrypted", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(attachmentValidation),
    (0, class_validator_1.IsJSON)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "attachment", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['linkAtt']),
    (0, class_validator_1.IsJSON)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "linkAtt", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object["forwardLocalId"]),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "forwardLocalId", void 0);
__decorate([
    (0, class_validator_1.Allow)(),
    (0, class_validator_1.ValidateIf)(object => object['replyToLocalId']),
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], SendMessageDto.prototype, "replyToLocalId", void 0);
exports.SendMessageDto = SendMessageDto;
function attachmentValidation(object) {
    let mT = object["messageType"];
    return mT == enums_1.MessageType.Video ||
        mT == enums_1.MessageType.Location ||
        mT == enums_1.MessageType.Custom ||
        mT == enums_1.MessageType.Voice;
}
//# sourceMappingURL=send.message.dto.js.map