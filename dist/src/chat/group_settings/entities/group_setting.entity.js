"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSettingSchema = void 0;
const mongoose_1 = require("mongoose");
exports.GroupSettingSchema = new mongoose_1.Schema({
    cId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    gName: { type: String, required: true },
    gImg: { type: String, required: true },
    outUsers: { type: [mongoose_1.Schema.Types.ObjectId], default: [], select: false },
    pinMsg: { type: Object, default: null },
    extraData: { type: Object, default: null },
    desc: { type: String, default: null },
    createdAt: { type: Date, select: true },
    updatedAt: { type: Date, select: false }
}, {
    timestamps: true,
});
//# sourceMappingURL=group_setting.entity.js.map