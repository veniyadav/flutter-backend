"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VersionSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const enums_1 = require("../../core/utils/enums");
exports.VersionSchema = new mongoose_1.default.Schema({
    semVer: { type: String, required: true },
    critical: { type: Boolean, default: false },
    notes: { type: String, default: null },
    updateUrl: { type: String, default: null },
    notify: { type: Boolean, default: false },
    platform: {
        type: String,
        enum: Object.values(enums_1.Platform),
        required: true
    },
}, {
    timestamps: true,
});
exports.VersionSchema.index({ semVer: 1, platform: 1 }, { unique: true });
//# sourceMappingURL=versions.entity.js.map