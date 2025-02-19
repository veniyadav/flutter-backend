"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCountryModule = void 0;
const common_1 = require("@nestjs/common");
const user_country_service_1 = require("./user_country.service");
const mongoose_1 = require("@nestjs/mongoose");
const countries_entity_1 = require("./countries.entity");
const countries_module_1 = require("../../countries/countries.module");
let UserCountryModule = class UserCountryModule {
};
UserCountryModule = __decorate([
    (0, common_1.Module)({
        providers: [user_country_service_1.UserCountryService],
        exports: [user_country_service_1.UserCountryService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: "user_country",
                    schema: countries_entity_1.UserCountrySchema
                }]),
            countries_module_1.CountriesModule
        ]
    })
], UserCountryModule);
exports.UserCountryModule = UserCountryModule;
//# sourceMappingURL=user_country.module.js.map