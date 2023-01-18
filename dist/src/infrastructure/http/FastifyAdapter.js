"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const fastify_1 = __importDefault(require("fastify"));
const swagger_1 = require("./docs/swagger");
class FastifyAdapter {
    constructor() {
        this.app = (0, fastify_1.default)({ logger: { level: 'info' } });
    }
    on(method, url, schema, callback) {
        this.app[method](url, schema, function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const { status, data } = yield callback(req);
                res.status(status).send(data);
            });
        });
    }
    listen(port) {
        this.app.listen(port, process.env.APP_HOST || '0.0.0.0');
    }
    loadSwagger() {
        return __awaiter(this, void 0, void 0, function* () {
            Promise.all([
                this.app.register(require('fastify-cors'), {
                    origin: [
                        `http://localhost:${process.env.PORT}`,
                        `http://127.0.0.1:${process.env.PORT}`,
                        process.env.APP_HOST
                    ],
                    methods: ['GET', 'PUT', 'POST', 'DELETE']
                }),
                this.app.register(require('fastify-swagger'), swagger_1.swaggerOptions)
            ]);
        });
    }
}
exports.default = FastifyAdapter;
