"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountrySchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.CountrySchema = new mongoose_1.default.Schema({
    code: { type: String, required: true },
    emoji: { type: String, required: true },
    unicode: { type: String, required: true },
    name: { type: String, required: true },
    image: { type: String, required: true },
}, {
    timestamps: true,
});
//# sourceMappingURL=countries.entity.js.map