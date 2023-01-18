"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
class ApplicationError extends Error {
    constructor(message, detailedMessage, statusCode) {
        super();
        this.message = message;
        this.detailedMessage = detailedMessage;
        this.statusCode = statusCode;
    }
    static badRequest(errors) {
        return new ApplicationError('Bad Request', errors, 400);
    }
}
exports.ApplicationError = ApplicationError;
