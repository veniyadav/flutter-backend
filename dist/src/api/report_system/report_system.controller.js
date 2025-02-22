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
exports.ReportSystemController = void 0;
const report_system_service_1 = require("./report_system.service");
const v1_controller_decorator_1 = require("../../core/common/v1-controller.decorator");
let ReportSystemController = class ReportSystemController {
    constructor(reportSystemService) {
        this.reportSystemService = reportSystemService;
    }
};
ReportSystemController = __decorate([
    (0, v1_controller_decorator_1.V1Controller)('report'),
    __metadata("design:paramtypes", [report_system_service_1.ReportSystemService])
], ReportSystemController);
exports.ReportSystemController = ReportSystemController;
//# sourceMappingURL=report_system.controller.js.map