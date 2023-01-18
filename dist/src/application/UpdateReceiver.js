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
const ReceiverNotFound_1 = require("../domain/errors/ReceiverNotFound");
const ReceiverMapper_1 = require("../domain/mapper/ReceiverMapper");
class UpdateReceiver {
    constructor(repository) {
        this.repository = repository;
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const receiverExists = yield this.repository.getById(input.id);
            if (!receiverExists) {
                throw new ReceiverNotFound_1.ReceiverNotFound(input.id);
            }
            const receiverToUpdated = (0, ReceiverMapper_1.inputToDomain)(input);
            const idUpdated = yield this.repository.update(receiverToUpdated);
            const receiverUpdated = yield this.repository.getById(idUpdated);
            return (0, ReceiverMapper_1.domainToOutput)(receiverUpdated);
        });
    }
}
exports.default = UpdateReceiver;
