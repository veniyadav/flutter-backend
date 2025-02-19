"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const path_1 = __importStar(require("path"));
const admin = __importStar(require("firebase-admin"));
const app_root_path_1 = __importDefault(require("app-root-path"));
const requestIp = require("request-ip");
const body_parser_1 = __importDefault(require("body-parser"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const common_1 = require("@nestjs/common");
const redis_io_adapter_1 = require("./chat/socket_io/redis-io.adapter");
async function bootstrap() {
    console.log(process.env.NODE_ENV);
    console.log("You use firebase as  push notification provider");
    await admin.initializeApp({ credential: admin.credential.cert(path_1.default.join(app_root_path_1.default.path, "firebase-adminsdk.json")) });
    console.log("You use  OneSignal as  push notification provider ");
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true,
    });
    let isDev = process.env.NODE_ENV == "development";
    app.use((0, morgan_1.default)("tiny", {
        skip: function (req, res) {
            if (isDev) {
                return false;
            }
            return res.statusCode < 400;
        }
    }));
    app.use((0, helmet_1.default)({ crossOriginResourcePolicy: false, }));
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        validateCustomDecorators: false,
        stopAtFirstError: true,
        transform: true
    }));
    app.use(requestIp.mw());
    const redisIoAdapter = new redis_io_adapter_1.RedisIoAdapter(app);
    app.useWebSocketAdapter(redisIoAdapter);
    const port = 4000;
    app.useStaticAssets((0, path_1.join)(app_root_path_1.default.path, "public"));
    app.useStaticAssets((0, path_1.join)(app_root_path_1.default.path, "public", "v-public"));
    app.useStaticAssets((0, path_1.join)(app_root_path_1.default.path, "public", "media"));
    await app.listen(port);
    console.log(`app run on port${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map