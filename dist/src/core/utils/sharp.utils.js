"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cropProfileImage = exports.cropProfileImageToImages = void 0;
const sharp_1 = __importDefault(require("sharp"));
async function cropProfileImageToImages(buffer) {
    const promises = [];
    promises.push((0, sharp_1.default)(buffer)
        .resize({ width: 200, height: 200 })
        .jpeg({ quality: 100 })
        .toBuffer());
    promises.push((0, sharp_1.default)(buffer)
        .resize({ width: 50, height: 50 })
        .jpeg({ quality: 80 })
        .toBuffer());
    return await Promise.all(promises);
}
exports.cropProfileImageToImages = cropProfileImageToImages;
async function cropProfileImage(buffer) {
    return (0, sharp_1.default)(buffer)
        .resize({ width: 1024, height: 1024 })
        .jpeg({ quality: 90 })
        .toBuffer();
}
exports.cropProfileImage = cropProfileImage;
//# sourceMappingURL=sharp.utils.js.map