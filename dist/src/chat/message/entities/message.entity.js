"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const enums_1 = require("../../../core/utils/enums");
exports.MessageSchema = new mongoose_1.Schema({
    sId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    sName: { type: String, required: true },
    sImg: { type: String, required: true },
    plm: {
        type: String,
        enum: Object.values(enums_1.Platform),
        required: true
    },
    rId: { type: mongoose_1.Schema.Types.ObjectId, required: true, index: 1 },
    c: { type: String, required: true },
    isEncrypted: { type: Boolean, default: false },
    mT: {
        type: String,
        enum: Object.values(enums_1.MessageType),
        required: true
    },
    msgAtt: {
        type: Object,
        default: null
    },
    rTo: {
        type: Object,
        default: null
    },
    isOneSeen: { type: Boolean, default: false },
    oneSeenBy: {
        type: [mongoose_1.Schema.Types.ObjectId],
        default: [],
    },
    mentions: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    sAt: {
        type: Date,
        default: null
    },
    dAt: {
        type: Date,
        default: null
    },
    forId: {
        type: String,
        default: null
    },
    dltAt: {
        type: Date,
        default: null
    },
    pBId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    dF: { type: [mongoose_1.Schema.Types.ObjectId], select: false, default: [] },
    stars: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    lId: { type: String, required: true, unique: true },
    linkAtt: {
        type: Object,
        default: null
    },
    peerData: { type: Object, default: null },
}, {
    timestamps: true,
});
exports.MessageSchema.plugin(mongoose_paginate_v2_1.default);
exports.MessageSchema.index({ stars: 1 });
exports.MessageSchema.index({ mentions: 1 });
exports.MessageSchema.index({ dF: 1 });
exports.MessageSchema.index({ sId: 1 });
exports.MessageSchema.index({ uId: 1 });
//# sourceMappingURL=message.entity.js.map