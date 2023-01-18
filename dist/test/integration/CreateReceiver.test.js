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
const ReceiverInputDummy_1 = require("../dummies/ReceiverInputDummy");
require('dotenv').config();
const setup_1 = require("./setup");
describe('Create receiver integration tests', () => {
    let input;
    beforeEach(() => {
        input = ReceiverInputDummy_1.ReceiverInputDummy.stub();
    });
    it('should create a new receiver', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = ReceiverInputDummy_1.ReceiverInputDummy.stub();
        const { status, body } = yield setup_1.request.post(`/receivers`).send(input);
        expect(status).toBe(201);
        expect(body.id).toBeDefined();
        expect(body.name).toEqual(input.name);
        expect(body.status).toEqual(input.status);
        expect(body.pixKeyType).toEqual(input.pixKeyType);
        expect(body.pixKey).toEqual(input.pixKey);
    }));
    const scenarios = [
        'name',
        'status',
        'pixKeyType',
        'pixKey',
    ];
    it.each(scenarios)('should return status code 400 when required field %s is not send', (scenario) => __awaiter(void 0, void 0, void 0, function* () {
        delete input[scenario];
        const { status, body } = yield setup_1.request.post(`/receivers`).send(input);
        expect(status).toBe(400);
        expect(body.statusCode).toBeDefined();
        expect(body.message).toEqual('Bad Request');
        expect(body.details).toBeDefined();
    }));
});
