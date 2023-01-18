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
describe('Get all receivers by filters integration tests', () => {
    let input;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        input = ReceiverInputDummy_1.ReceiverInputDummy.stub();
        yield setup_1.request.post(`/receivers`).send(input);
    }));
    it('should get all receivers by filters', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield setup_1.request.get(`/receivers`);
        expect(status).toBe(200);
        expect(body.totalPages).toBeDefined();
        expect(body.currentPage).toEqual(1);
        expect(body.data).toBeDefined();
    }));
});
