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
require('dotenv').config();
const ReceiverInputDummy_1 = require("../dummies/ReceiverInputDummy");
const setup_1 = require("./setup");
describe('Delete receivers in batches integration tests', () => {
    const NUMBER_OF_RECEIVERS_TO_CREATED = 3;
    let input;
    let idsToBeDeleted = [];
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        for (let i = 0; i < NUMBER_OF_RECEIVERS_TO_CREATED; i++) {
            input = ReceiverInputDummy_1.ReceiverInputDummy.stub();
            const { body } = yield setup_1.request.post(`/receivers`).send(input);
            idsToBeDeleted.push(body.id);
        }
    }));
    it('should delete a receivers in batches', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status } = yield setup_1.request.post('/receivers/delete-records').send({
            ids: idsToBeDeleted
        });
        expect(status).toBe(204);
    }));
    it('should return status code 400 when at least one id is not send', () => __awaiter(void 0, void 0, void 0, function* () {
        const { status, body } = yield setup_1.request.post('/receivers/delete-records').send({
            ids: []
        });
        expect(status).toBe(400);
        expect(body.statusCode).toBeDefined();
        expect(body.message).toEqual('Bad Request');
        expect(body.details).toBeDefined();
    }));
});
