"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appValidator = exports.jsonDecoder = void 0;
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
function jsonDecoder(data) {
    try {
        return JSON.parse(data);
    }
    catch (e) {
        throw new common_1.BadRequestException("Not valid json data " + data);
    }
}
exports.jsonDecoder = jsonDecoder;
async function appValidator(dto) {
    await (0, class_validator_1.validateOrReject)(dto, {
        enableDebugMessages: false,
        forbidNonWhitelisted: true,
        whitelist: true,
        stopAtFirstError: true
    });
}
exports.appValidator = appValidator;
//# sourceMappingURL=app.validator.js.map