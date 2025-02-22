"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoomSettings = void 0;
const mongoose_1 = require("mongoose");
exports.OrderRoomSettings = new mongoose_1.Schema({
    cId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "user", index: 1 },
    pId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: "user", index: 1 },
    orderId: { type: String, required: true, },
    pinData: { type: Object, default: null },
    orderTitle: { type: String, default: null },
    orderImage: { type: String, default: null },
    closedAt: { type: Date, default: null },
    updatedAt: { type: Date, select: false }
}, {
    timestamps: true,
});
//# sourceMappingURL=order_room_setting.entity.js.map