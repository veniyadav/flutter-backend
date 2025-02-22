"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastMemberSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.BroadcastMemberSchema = new mongoose_1.Schema({
    uId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "user" },
    rId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    bId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    userData: { type: Object, required: true },
    updatedAt: { type: Date, select: false }
}, {
    timestamps: true,
});
exports.BroadcastMemberSchema.index({ rId: 1, uId: 1, bId: 1 }, { unique: true });
exports.BroadcastMemberSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=broadcast_member.entity.js.map