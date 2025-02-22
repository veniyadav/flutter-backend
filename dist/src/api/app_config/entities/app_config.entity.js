"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppConfigSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("../../../core/utils/enums");
exports.AppConfigSchema = new mongoose_1.default.Schema({
    configVersion: { type: Number, default: 1 },
    backendVersion: { type: String, default: "1.0.0" },
    enableAds: { type: Boolean, default: true },
    feedbackEmail: { type: String, default: "vchatsdk@gmail.com" },
    allowWebLogin: { type: Boolean, default: true },
    allowMobileLogin: { type: Boolean, default: true },
    allowCreateGroup: { type: Boolean, default: true },
    appName: { type: String, default: "Super up" },
    allowCreateBroadcast: { type: Boolean, default: true },
    allowDesktopLogin: { type: Boolean, default: true },
    privacyUrl: { type: String, default: "https://api.superupdev.online/privacy-policy" },
    googlePayUrl: { type: String, default: null },
    webChatUrl: { type: String, default: null },
    windowsStoreUrl: { type: String, default: null },
    macStoreUrl: { type: String, default: null },
    appleStoreUrl: { type: String, default: null },
    maxExpireEmailTime: { type: Number, default: 5 },
    userRegisterStatus: { type: String, default: enums_1.RegisterStatus.accepted },
    userIcon: { type: String, default: "default_user_image.png" },
    callTimeout: { type: Number, default: 60000 },
    roomIcons: {
        type: Object, default: {
            group: "👥",
            order: "💬",
            broadcast: "📢"
        }
    },
    allowMessaging: { type: Boolean, default: true },
    allowSendMedia: { type: Boolean, default: true },
    maxGroupMembers: { type: Number, default: 512 },
    maxBroadcastMembers: { type: Number, default: 512 },
    maxForward: { type: Number, default: 10 },
    maxChatMediaSize: { type: Number, default: 1024 * 1024 * 100 },
    allowCall: { type: Boolean, default: true },
    groupIcon: { type: String, default: "default_group_image.png" },
    supportIcon: { type: String, default: "default_support_image.png" },
    broadcastIcon: { type: String, default: "default_broadcast_image.png" }
}, {
    timestamps: true
});
//# sourceMappingURL=app_config.entity.js.map