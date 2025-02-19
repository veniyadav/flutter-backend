"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AllExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionFilter = AllExceptionFilter_1 = class AllExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(AllExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? exception.getStatus()
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message;
        try {
            if (exception instanceof common_1.HttpException) {
                let isArray = Array.isArray(exception.getResponse()["message"]);
                if (isArray) {
                    message = exception.getResponse()["message"][0];
                }
                else {
                    try {
                        let msgX = exception.getResponse()["message"];
                        if (!msgX) {
                            message = exception.getResponse();
                        }
                        else {
                            message = msgX;
                        }
                    }
                    catch (e) {
                        message = exception.getResponse();
                    }
                }
            }
            else {
                message = exception.toString();
                this.logger.error(exception.stack);
            }
        }
        catch (e) {
            message = exception.toString();
        }
        let errorBody = message.toString();
        const responseBody = {
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            data: errorBody,
            requestInfo: {
                path: request.path,
                hostname: request.hostname,
                method: request.method,
                originalUrl: request.originalUrl,
                query: request.query,
                body: request.body,
                params: request.params,
                headers: request.headers,
            },
        };
        return response.status(status).json(responseBody);
    }
};
AllExceptionFilter = AllExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], AllExceptionFilter);
exports.AllExceptionFilter = AllExceptionFilter;
//# sourceMappingURL=all-exception.filter.js.map