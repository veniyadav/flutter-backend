"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgoraService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const newAgora = __importStar(require("agora-token"));
const agora_token_1 = require("agora-token");
let AgoraService = class AgoraService {
    constructor(configService) {
        this.configService = configService;
    }
    getAgoraAccessNew(channelName, create) {
        let role = newAgora.RtcRole.PUBLISHER;
        let expireTime = 3600;
        let currentTime = Math.floor(Date.now() / 1000);
        let privilegeExpireTime = currentTime + expireTime;
        let token = agora_token_1.RtcTokenBuilder.buildTokenWithUid("ca89167169aa4ba293aaa4c669fd25c4", "461a128969dc432e9f1afdf02d0a079c", channelName, 0, role, expireTime, privilegeExpireTime);
        return ({
            'channelName': channelName,
            'uid': 0,
            'rtcToken': token,
            'joinedAt': new Date()
        });
    }
    getAgoraAccess(channelName, userId, create) {
        return this.getAgoraAccessNew(channelName, create);
    }
};
AgoraService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AgoraService);
exports.AgoraService = AgoraService;
//# sourceMappingURL=agora.service.js.map