"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const enums_1 = require("../../../../core/utils/enums");
const user_global_call_status_model_1 = require("../../../../chat/call_modules/utils/user-global-call-status.model");
exports.UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    fullNameEn: { type: String, required: true },
    bio: { type: String, default: null },
    isactive: { type: Boolean, default: true },
    userGlobalCallStatus: { type: Object, default: user_global_call_status_model_1.UserGlobalCallStatus.createEmpty() },
    uniqueCode: { type: Number, required: true },
    password: { type: String, required: true, select: false },
    lastMail: { type: Object, default: {} },
    verifiedAt: { type: Date, default: null },
    userImage: { type: String, default: "default_user_image.png" },
    registerStatus: {
        type: String,
        enum: Object.values(enums_1.RegisterStatus),
        required: true
    },
    registerMethod: {
        type: String,
        enum: Object.values(enums_1.RegisterMethod),
        required: true
    },
    roles: {
        type: [String],
        default: [],
        enum: Object.values(enums_1.UserRole),
    },
    banTo: { type: Date, default: null },
    countryId: { type: mongoose_1.Schema.Types.ObjectId, default: null, ref: "countries" },
    createdAt: { type: Date, },
    deletedAt: { type: Date, default: null, },
    userPrivacy: {
        type: Object,
        default: {
            startChat: enums_1.UserPrivacyTypes.ForReq,
            publicSearch: true,
            showStory: enums_1.UserPrivacyTypes.ForReq,
            lastSeen: true,
        }
    },
    lastSeenAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
}, {
    timestamps: true
});
exports.UserSchema.pre("save", async function (next) {
    let user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt_1.default.genSalt(10);
    user.password = await bcrypt_1.default.hashSync(user.password, salt);
    return next();
});
exports.UserSchema.pre("findOneAndUpdate", async function (next) {
    let user = this.getUpdate();
    if (!user || !user.password) {
        return next();
    }
    const salt = await bcrypt_1.default.genSalt(10);
    user.password = await bcrypt_1.default.hashSync(user.password, salt);
    this.findOneAndUpdate({}, { $set: user });
    return next();
});
exports.UserSchema.plugin(mongoose_paginate_v2_1.default);
//# sourceMappingURL=user.entity.js.map