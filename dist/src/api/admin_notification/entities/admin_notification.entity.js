"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminNotificationSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.AdminNotificationSchema = new mongoose_1.default.Schema({
    content: { type: String, required: true },
    title: { type: String, required: true },
    imageUrl: { type: String, }
}, {
    timestamps: true
});
exports.AdminNotificationSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=admin_notification.entity.js.map