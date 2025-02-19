"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileInterceptor = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
exports.imageFileInterceptor = (0, platform_express_1.FileInterceptor)('file', {
    limits: {
        fileSize: 2 * 1024 * 1024,
        files: 1,
    },
    fileFilter: (req, file, cb) => {
        if (!constants_1.whitelistImages.includes(file.mimetype)) {
            return cb(new common_1.BadRequestException('Image extension not allowed'), false);
        }
        return cb(null, true);
    },
});
//# sourceMappingURL=upload_interceptors.js.map