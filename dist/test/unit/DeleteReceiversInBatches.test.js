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
const DeleteReceiversInBatches_1 = __importDefault(require("../../src/application/DeleteReceiversInBatches"));
describe('Delete receivers in batches use case unit tests', () => {
    const repositoryMock = {
        getById: jest.fn(),
        create: jest.fn(),
        getAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    };
    it('Should delete receivers in batches', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = {
            ids: [71, 72, 73]
        };
        repositoryMock.delete = jest.fn().mockImplementationOnce(() => Promise.resolve());
        const useCase = new DeleteReceiversInBatches_1.default(repositoryMock);
        yield useCase.execute(input);
        expect(repositoryMock.delete).toBeCalledTimes(1);
    }));
});
