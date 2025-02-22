"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.ReportSchema = new mongoose_1.default.Schema({
    uId: { type: String, required: true, ref: "user" },
    targetId: { type: String, required: true, ref: "user" },
    content: { type: String, required: true },
    type: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
}, {
    timestamps: true
});
exports.ReportSchema.index({ uId: 1, targetId: 1 }, { unique: true });
exports.ReportSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=report_system.entity.js.map