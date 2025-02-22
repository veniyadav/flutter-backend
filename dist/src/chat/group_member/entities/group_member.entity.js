"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupMemberSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const enums_1 = require("../../../core/utils/enums");
exports.GroupMemberSchema = new mongoose_1.Schema({
    uId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'user' },
    rId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    gR: {
        type: String,
        default: enums_1.GroupRoleType.Member,
        enum: [
            enums_1.GroupRoleType.Member,
            enums_1.GroupRoleType.Admin,
            enums_1.GroupRoleType.SuperAdmin,
        ],
    },
    userData: { type: Object, required: true },
    updatedAt: { type: Date, select: false }
}, {
    timestamps: true,
});
exports.GroupMemberSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=group_member.entity.js.map