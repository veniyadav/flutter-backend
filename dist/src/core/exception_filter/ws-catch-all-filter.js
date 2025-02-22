"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsCatchAllFilter = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../utils/enums");
const ws_exceptions_1 = require("./ws-exceptions");
let WsCatchAllFilter = class WsCatchAllFilter {
    catch(exception, host) {
        const socket = host.switchToWs().getClient();
        console.log(exception);
        if (exception instanceof common_1.BadRequestException) {
            const exceptionData = exception.getResponse();
            const exceptionMessage = exceptionData["message"] ?? exceptionData ?? exception.name;
            const wsException = new ws_exceptions_1.WsBadRequestException(exceptionMessage);
            socket.emit(enums_1.SocketEventsType.v1OnException, wsException.getError().toString());
            return;
        }
        const wsException = new ws_exceptions_1.WsUnknownException(exception.toString());
        socket.emit(enums_1.SocketEventsType.v1OnException, wsException.getError().toString());
    }
};
WsCatchAllFilter = __decorate([
    (0, common_1.Catch)()
], WsCatchAllFilter);
exports.WsCatchAllFilter = WsCatchAllFilter;
//# sourceMappingURL=ws-catch-all-filter.js.map