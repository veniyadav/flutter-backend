"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstRunModule = void 0;
const common_1 = require("@nestjs/common");
const first_run_service_1 = require("./first_run.service");
const user_module_1 = require("../../../api/user_modules/user/user.module");
const app_config_module_1 = require("../../../api/app_config/app_config.module");
const countries_module_1 = require("../../../api/countries/countries.module");
const versions_module_1 = require("../../../api/versions/versions.module");
const call_history_module_1 = require("../../../chat/call_modules/call_history/call_history.module");
let FirstRunModule = class FirstRunModule {
};
FirstRunModule = __decorate([
    (0, common_1.Module)({
        providers: [first_run_service_1.FirstRunService],
        imports: [
            user_module_1.UserModule,
            app_config_module_1.AppConfigModule,
            countries_module_1.CountriesModule,
            versions_module_1.VersionsModule,
            call_history_module_1.CallHistoryModule
        ],
    })
], FirstRunModule);
exports.FirstRunModule = FirstRunModule;
//# sourceMappingURL=first_run.module.js.map