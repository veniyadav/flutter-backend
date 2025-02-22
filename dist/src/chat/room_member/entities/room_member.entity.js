"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomMemberSchema = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../../../core/utils/enums");
const aggregatePaginate = require("mongoose-aggregate-paginate-v2");
exports.RoomMemberSchema = new mongoose_1.Schema({
    uId: { type: mongoose_1.Schema.Types.ObjectId, required: true, index: 1, ref: "User" },
    rId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    lSMId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    rT: { type: String, enum: Object.values(enums_1.RoomType), required: true },
    t: { type: String, required: true },
    tEn: { type: String, required: true },
    nTitle: { type: String, default: null },
    img: { type: String, default: null },
    isD: { type: Boolean, default: false },
    isOneSeen: { type: Boolean, default: false },
    isA: { type: Boolean, default: false },
    isM: { type: Boolean, default: false },
    tTo: { type: String, default: null },
    pId: { type: mongoose_1.Schema.Types.ObjectId, default: null },
    orderId: { type: String, default: null },
    updatedAt: { type: Date, select: false }
}, {
    timestamps: true,
});
exports.RoomMemberSchema.index({ rId: 1, uId: 1 }, { unique: true });
exports.RoomMemberSchema.plugin(aggregatePaginate);
exports.RoomMemberSchema.index({ rId: 1 });
exports.RoomMemberSchema.index({ rT: 1 });
exports.RoomMemberSchema.index({ lSMId: 1 });
//# sourceMappingURL=room_member.entity.js.map