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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallHistorySchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const enums_1 = require("../../../core/utils/enums");
exports.CallHistorySchema = new mongoose_1.default.Schema({
    caller: { type: String, required: true, ref: "user" },
    callee: { type: String, ref: "user", default: null },
    participants: {
        type: [{
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'user',
                required: true,
            },], default: [], required: true
    },
    callStatus: { type: String, enum: Object.values(enums_1.CallStatus), required: true, index: 1 },
    roomId: { type: String, required: true, ref: "group_settings" },
    roomType: { type: String, required: true },
    withVideo: { type: Boolean, required: true },
    meetPlatform: { type: String, enum: Object.values(enums_1.MeetPlatform), default: enums_1.MeetPlatform.WebRtc },
    endAt: { type: Date, default: null },
    deleteFrom: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
}, {
    timestamps: true,
});
exports.CallHistorySchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=call.history.entity.js.map