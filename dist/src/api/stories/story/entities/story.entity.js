"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorySchema = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../../../../core/utils/enums");
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
exports.StorySchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'user', index: 1 },
    content: { type: String, default: null },
    backgroundColor: { type: String, default: null },
    textAlign: { type: String, default: null },
    textColor: { type: String, default: null },
    caption: { type: String, default: null },
    storyType: { type: String, default: enums_1.StoryType.Text },
    storyPrivacy: { type: String, default: enums_1.StoryPrivacy.Public },
    somePeople: { type: [mongoose_1.Schema.Types.ObjectId], default: [] },
    fontType: { type: String, default: enums_1.StoryFontType.Normal },
    views: { type: [], default: [] },
    att: {
        type: Object,
        default: null
    },
    updatedAt: { type: Date, select: false },
    createdAt: { type: Date },
    expireAt: { type: Date, index: 1 }
}, {
    timestamps: true,
});
exports.StorySchema.plugin(mongoose_aggregate_paginate_v2_1.default);
exports.StorySchema.index({ somePeople: 1 });
//# sourceMappingURL=story.entity.js.map