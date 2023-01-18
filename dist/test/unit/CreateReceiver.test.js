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
const CreateReceiver_1 = __importDefault(require("../../src/application/CreateReceiver"));
const ReceiverDummy_1 = require("../dummies/ReceiverDummy");
const ReceiverInputDummy_1 = require("../dummies/ReceiverInputDummy");
describe('Create receiver use case unit tests', () => {
    const repositoryMock = {
        getById: jest.fn(),
        create: jest.fn(),
        getAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };
    it('Should create a new receiver', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = ReceiverInputDummy_1.ReceiverInputDummy.stub();
        const fakerId = 71;
        const receiver = ReceiverDummy_1.ReceiverDummy.stub(input);
        repositoryMock.create = jest.fn().mockResolvedValue(fakerId);
        repositoryMock.getById = jest.fn().mockResolvedValue(receiver);
        const useCase = new CreateReceiver_1.default(repositoryMock);
        yield useCase.execute(input);
        expect(repositoryMock.create).toBeCalledTimes(1);
        expect(repositoryMock.create).toHaveBeenCalledWith(receiver);
        expect(repositoryMock.getById).toBeCalledTimes(1);
        expect(repositoryMock.getById).toHaveBeenCalledWith(fakerId);
    }));
});
