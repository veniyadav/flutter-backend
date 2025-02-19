"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersMimePasswordSize = exports.usersMaxPasswordSize = exports.usersMaxNameSize = exports.whitelistImages = void 0;
const whitelistImages = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/bmp",
    "image/x-png",
    "image/webp",
    "image/tiff",
    "image/apng"
];
exports.whitelistImages = whitelistImages;
const usersMaxNameSize = 50;
exports.usersMaxNameSize = usersMaxNameSize;
const usersMaxPasswordSize = 255;
exports.usersMaxPasswordSize = usersMaxPasswordSize;
const usersMimePasswordSize = 6;
exports.usersMimePasswordSize = usersMimePasswordSize;
//# sourceMappingURL=constants.js.map