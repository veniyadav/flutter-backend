"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploaderModule = void 0;
const common_1 = require("@nestjs/common");
const file_uploader_service_1 = require("./file_uploader.service");
let FileUploaderModule = class FileUploaderModule {
};
FileUploaderModule = __decorate([
    (0, common_1.Module)({
        providers: [file_uploader_service_1.FileUploaderService],
        exports: [file_uploader_service_1.FileUploaderService],
    })
], FileUploaderModule);
exports.FileUploaderModule = FileUploaderModule;
//# sourceMappingURL=file_uploader.module.js.map