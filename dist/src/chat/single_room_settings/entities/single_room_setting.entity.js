"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleRoomSettings = void 0;
const mongoose_1 = require("mongoose");
exports.SingleRoomSettings = new mongoose_1.Schema({
    cId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "user", index: 1 },
    pId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "user", index: 1 },
    updatedAt: { type: Date, select: false }
}, {
    timestamps: true,
});
exports.SingleRoomSettings.index({ cId: 1, pId: 1 }, { unique: true });
//# sourceMappingURL=single_room_setting.entity.js.map