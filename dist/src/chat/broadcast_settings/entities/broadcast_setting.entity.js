"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BroadcastSettingSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BroadcastSettingSchema = new mongoose_1.Schema({
    cId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "user" },
    outUsers: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    bName: { type: String, required: true },
    bImg: { type: String, required: true },
    createdAt: { type: Date, select: false },
    updatedAt: { type: Date, select: false }
}, {
    timestamps: true,
});
//# sourceMappingURL=broadcast_setting.entity.js.map