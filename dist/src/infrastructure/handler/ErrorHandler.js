"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationError_1 = require("../../domain/errors/ApplicationError");
function composeErrorHandler(errorHandlers = []) {
    return function errorHandler(error, request, reply) {
        let handledError;
        for (const handler of errorHandlers) {
            handledError = handler(error, request);
            if (handledError)
                break;
        }
        handledError = handledError || error;
        handledError = handledError || error;
        if (handledError instanceof ApplicationError_1.ApplicationError) {
            reply
                .status(handledError.statusCode || 500)
                .send({
                statusCode: handledError.statusCode,
                message: handledError.message || 'Internal Server Error',
                details: handledError.detailedMessage,
            });
            return;
        }
    };
}
exports.default = composeErrorHandler;
