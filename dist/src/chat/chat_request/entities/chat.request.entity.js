"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRequestSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const enums_1 = require("../../../core/utils/enums");
exports.ChatRequestSchema = new mongoose_1.Schema({
    senderId: { type: mongoose_1.Schema.Types.ObjectId, required: true, index: 1, ref: "User" },
    receiverId: { type: mongoose_1.Schema.Types.ObjectId, required: true, index: 1, ref: "User" },
    roomId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    roomType: { type: String, enum: Object.values(enums_1.RoomType), required: true, index: 1 },
    status: { type: String, enum: Object.values(enums_1.ChatRequestStatus), required: true },
}, {
    timestamps: true,
});
exports.ChatRequestSchema.index({ senderId: 1, receiverId: 1, roomId: 1 }, { unique: true });
exports.ChatRequestSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=chat.request.entity.js.map