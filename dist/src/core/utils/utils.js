"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.humanAudioTime = exports.humanFileSize = exports.newMongoObjId = exports.isValidMongoId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const isValidMongoId = (id) => {
    return mongoose_1.default.Types.ObjectId.isValid(id);
};
exports.isValidMongoId = isValidMongoId;
const newMongoObjId = (string) => {
    if (string) {
        return new mongoose_1.default.Types.ObjectId(string);
    }
    return new mongoose_1.default.Types.ObjectId();
};
exports.newMongoObjId = newMongoObjId;
const humanFileSize = (size) => {
    let i = Math.floor(Math.log(size) / Math.log(1024));
    return (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["B", "kB", "MB", "GB", "TB"][i];
};
exports.humanFileSize = humanFileSize;
const humanAudioTime = (time) => {
    const sec = parseInt(time.toString(), 10);
    let m = sec % 60;
    return Math.floor(sec / 60) + ":" + (m ? m : "00");
};
exports.humanAudioTime = humanAudioTime;
//# sourceMappingURL=utils.js.map