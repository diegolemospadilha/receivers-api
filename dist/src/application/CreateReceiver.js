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
const ReceiverMapper_1 = require("../domain/mapper/ReceiverMapper");
class CreateReceiver {
    constructor(repository) {
        this.repository = repository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const receiverToCreated = (0, ReceiverMapper_1.inputToDomain)(input);
            const idCreated = yield this.repository.create(receiverToCreated);
            const createdReceived = yield this.repository.getById(idCreated);
            return (0, ReceiverMapper_1.domainToOutput)(createdReceived);
        });
    }
}
exports.default = CreateReceiver;
