"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMongoIdsObject = void 0;
const class_validator_1 = require("class-validator");
const utils_1 = require("../../utils/utils");
const app_validator_1 = require("../../utils/app.validator");
function IsMongoIdsObject(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: "IsMongoIdsObject",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions ?? { message: "The list must be valid mongo id object !" },
            validator: {
                validate(value, args) {
                    if (!value) {
                        return false;
                    }
                    let data = [];
                    try {
                        data = (0, app_validator_1.jsonDecoder)(JSON.parse(value));
                    }
                    catch (err) {
                    }
                    if (!Array.isArray(data)) {
                        return false;
                    }
                    if (value.length == 0) {
                        return false;
                    }
                    for (let i of data) {
                        if (!(0, utils_1.isValidMongoId)(i)) {
                            return false;
                        }
                    }
                    return true;
                }
            }
        });
    };
}
exports.IsMongoIdsObject = IsMongoIdsObject;
//# sourceMappingURL=class.validator.array.ids.decorator.dto.js.map