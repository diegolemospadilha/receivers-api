"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiverNotFound = void 0;
const ApplicationError_1 = require("./ApplicationError");
class ReceiverNotFound extends ApplicationError_1.ApplicationError {
    constructor(id) {
        super('Not found', `Receiver not found with id: ${id}`, 404);
        this.id = id;
    }
}
exports.ReceiverNotFound = ReceiverNotFound;
