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
const UpdateReceiver_1 = __importDefault(require("../../src/application/UpdateReceiver"));
const ReceiverNotFound_1 = require("../../src/domain/errors/ReceiverNotFound");
const ReceiverDummy_1 = require("../dummies/ReceiverDummy");
const ReceiverInputDummy_1 = require("../dummies/ReceiverInputDummy");
describe('Update receiver use case unit tests', () => {
    const repositoryMock = {
        getById: jest.fn(),
        create: jest.fn(),
        getAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };
    it('Should update a receiver', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakerId = 71;
        const input = ReceiverInputDummy_1.ReceiverInputDummy.stub(71);
        const receiver = ReceiverDummy_1.ReceiverDummy.stub(input);
        repositoryMock.getById = jest.fn().mockResolvedValue(receiver);
        repositoryMock.update = jest.fn().mockResolvedValue(fakerId);
        const useCase = new UpdateReceiver_1.default(repositoryMock);
        yield useCase.execute(input);
        expect(repositoryMock.update).toBeCalledTimes(1);
        expect(repositoryMock.update).toHaveBeenCalledWith(receiver);
        expect(repositoryMock.getById).toBeCalledTimes(2);
        expect(repositoryMock.getById).toHaveBeenCalledWith(fakerId);
    }));
    it('Should not update a receiver when receiver is not found', () => __awaiter(void 0, void 0, void 0, function* () {
        const fakerId = 71;
        const input = ReceiverInputDummy_1.ReceiverInputDummy.stub(71);
        repositoryMock.getById = jest.fn().mockResolvedValue(null);
        repositoryMock.update = jest.fn().mockResolvedValue(fakerId);
        const useCase = new UpdateReceiver_1.default(repositoryMock);
        expect(useCase.execute(input))
            .rejects.toThrow(new ReceiverNotFound_1.ReceiverNotFound(fakerId));
        expect(repositoryMock.update).not.toBeCalled();
        expect(repositoryMock.getById).toBeCalledTimes(1);
        expect(repositoryMock.getById).toHaveBeenCalledWith(fakerId);
    }));
});
