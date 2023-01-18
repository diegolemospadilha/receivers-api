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
Object.defineProperty(exports, "__esModule", { value: true });
const receiver_1 = require("../http/docs/receiver");
class ReceiverController {
    constructor(httpServer, createReceiverUseCase, getAllReceiversUseCase, updateReceiverUseCase, deleteReceiversByBatch) {
        this.httpServer = httpServer;
        this.createReceiverUseCase = createReceiverUseCase;
        this.getAllReceiversUseCase = getAllReceiversUseCase;
        this.updateReceiverUseCase = updateReceiverUseCase;
        this.deleteReceiversByBatch = deleteReceiversByBatch;
        httpServer.on("post", "/receivers", {
            schema: receiver_1.createReceiverDoc
        }, function (request) {
            return __awaiter(this, void 0, void 0, function* () {
                const { body } = request;
                const data = yield createReceiverUseCase.execute(body);
                return { data, status: 201 };
            });
        });
        httpServer.on("get", "/receivers", {
            schema: receiver_1.getReceiversDoc,
        }, function (request) {
            return __awaiter(this, void 0, void 0, function* () {
                const { query } = request;
                const input = {
                    name: query.name,
                    status: query.status,
                    pixKeyType: query.pixKeyType,
                    pixKey: query.pixKey,
                    page: parseInt(query.page)
                };
                const data = yield getAllReceiversUseCase.execute(input);
                return { data, status: 200 };
            });
        });
        httpServer.on("put", "/receivers/:id", {
            schema: receiver_1.updateReceiverDoc
        }, function (request) {
            return __awaiter(this, void 0, void 0, function* () {
                const { params, body } = request;
                const input = Object.assign({ id: parseInt(params.id) }, body);
                const data = yield updateReceiverUseCase.execute(input);
                return { data, status: 200 };
            });
        });
        httpServer.on("post", "/receivers/delete-records", {
            schema: receiver_1.deleteReceiversInBatchDoc
        }, function (request) {
            return __awaiter(this, void 0, void 0, function* () {
                const { body } = request;
                const data = yield deleteReceiversByBatch.execute(body);
                return { data, status: 204 };
            });
        });
    }
}
exports.default = ReceiverController;
