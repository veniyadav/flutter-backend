"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisIoAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const auth_service_1 = require("../../api/auth/auth.service");
class RedisIoAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app) {
        super(app);
        this.app = app;
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.use(async (socket, next) => {
            try {
                let authToken;
                if (socket.handshake['headers']['authorization']) {
                    authToken = socket.handshake['headers']['authorization'].split(" ")[1];
                }
                else {
                    if (socket.handshake.query['auth']) {
                        authToken = socket.handshake.query['auth'].split(" ")[1];
                    }
                }
                if (!authToken) {
                    next(new Error("Auth must be provided !"));
                }
                let authService = this.app.get(auth_service_1.AuthService);
                socket.user = await authService.getVerifiedUser(authToken);
                next();
            }
            catch (e) {
                console.log(e);
                next(e);
            }
        });
        return server;
    }
}
exports.RedisIoAdapter = RedisIoAdapter;
//# sourceMappingURL=redis-io.adapter.js.map