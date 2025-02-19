"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const call_history_service_1 = require("./call_history.service");
const mongoose_1 = require("@nestjs/mongoose");
const call_history_entity_1 = require("./call.history.entity");
let CallHistoryModule = class CallHistoryModule {
};
CallHistoryModule = __decorate([
    (0, common_1.Module)({
        providers: [call_history_service_1.CallHistoryService],
        exports: [call_history_service_1.CallHistoryService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "call_history",
                    schema: call_history_entity_1.CallHistorySchema
                }]),
        ]
    })
], CallHistoryModule);
exports.CallHistoryModule = CallHistoryModule;
//# sourceMappingURL=call_history.module.js.map