"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbMigrateModule = void 0;
const common_1 = require("@nestjs/common");
const db_migrate_service_1 = require("./db_migrate.service");
const user_module_1 = require("../../../api/user_modules/user/user.module");
const message_module_1 = require("../../../chat/message/message.module");
const app_config_module_1 = require("../../../api/app_config/app_config.module");
const admin_panel_module_1 = require("../../../api/admin_panel/admin_panel.module");
let DbMigrateModule = class DbMigrateModule {
};
DbMigrateModule = __decorate([
    (0, common_1.Module)({
        providers: [db_migrate_service_1.DbMigrateService],
        imports: [
            user_module_1.UserModule,
            message_module_1.MessageModule,
            app_config_module_1.AppConfigModule,
            admin_panel_module_1.AdminPanelModule
        ]
    })
], DbMigrateModule);
exports.DbMigrateModule = DbMigrateModule;
//# sourceMappingURL=db_migrate.module.js.map