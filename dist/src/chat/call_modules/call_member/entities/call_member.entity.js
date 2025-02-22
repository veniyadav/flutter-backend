"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeetMemberSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.MeetMemberSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    callId: { type: String, required: true },
    userDeviceId: { type: String, required: true },
    roomId: { type: String, required: true },
}, {
    timestamps: true,
});
exports.MeetMemberSchema.index({ userId: 1, callId: 1, roomId: 1 }, { unique: true });
exports.MeetMemberSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=call_member.entity.js.map