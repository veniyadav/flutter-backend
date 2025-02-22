"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCountryAdminService = void 0;
const common_1 = require("@nestjs/common");
const user_country_service_1 = require("../../user_modules/user_country/user_country.service");
const utils_1 = require("../../../core/utils/utils");
let UserCountryAdminService = class UserCountryAdminService {
    constructor(userCountryService) {
        this.userCountryService = userCountryService;
    }
    async getUserCountries(id) {
        let agg = [
            {
                '$match': {
                    'uId': (0, utils_1.newMongoObjId)(id)
                }
            }, {
                '$group': {
                    '_id': '$countryId',
                    'count': {
                        '$count': {}
                    }
                }
            }, {
                '$lookup': {
                    'from': 'countries',
                    'localField': '_id',
                    'foreignField': '_id',
                    'as': 'data'
                }
            },
            {
                $sort: {
                    'count': -1,
                },
            },
        ];
        return this.userCountryService.aggregate(agg);
    }
    async getCountriesInfo() {
        let agg = [
            {
                '$group': {
                    '_id': '$countryId',
                    'count': {
                        '$count': {}
                    }
                }
            }, {
                '$lookup': {
                    'from': 'countries',
                    'localField': '_id',
                    'foreignField': '_id',
                    'as': 'data'
                }
            },
            {
                $sort: {
                    'count': -1,
                },
            },
        ];
        let data = await this.userCountryService.aggregate(agg);
        let res = [];
        for (let i of data) {
            try {
                res.push({
                    count: i["count"],
                    country: i["data"][0]
                });
            }
            catch (err) {
                console.log("Error while get userCountryService getCountriesInfo for loop!");
            }
        }
        return res;
    }
};
UserCountryAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_country_service_1.UserCountryService])
], UserCountryAdminService);
exports.UserCountryAdminService = UserCountryAdminService;
//# sourceMappingURL=user_country_admin.service.js.map