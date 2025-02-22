"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMessageStatusSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.GroupMessageStatusSchema = new mongoose_1.Schema({
    mId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    rId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    uId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'user' },
    dAt: { type: Date, default: null },
    sAt: { type: Date, default: null },
    cAt: { type: Date, default: new Date() },
}, {
    timestamps: false,
});
exports.GroupMessageStatusSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=group_message_status.entity.js.map