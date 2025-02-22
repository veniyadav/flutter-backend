"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDevelopment = void 0;
const common_1 = require("@nestjs/common");
exports.IsDevelopment = (0, common_1.createParamDecorator)((data, ctx) => {
    return process.env.NODE_ENV == "development";
});
//# sourceMappingURL=decorators.js.map