"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.V1Controller = void 0;
const common_1 = require("@nestjs/common");
function V1Controller(prefix) {
    if (prefix.startsWith("/")) {
        return (0, common_1.Controller)(`api/v1${prefix}`);
    }
    return (0, common_1.Controller)(`api/v1/${prefix}`);
}
exports.V1Controller = V1Controller;
//# sourceMappingURL=v1-controller.decorator.js.map