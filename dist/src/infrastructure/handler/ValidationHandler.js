"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorHandler = void 0;
const ApplicationError_1 = require("../../domain/errors/ApplicationError");
function validationErrorHandler(error) {
    if ('validation' in error) {
        const errors = error.validation.map((err) => (Object.assign({ path: err.instancePath || undefined, message: err.message }, err.params)));
        return ApplicationError_1.ApplicationError.badRequest(errors);
    }
}
exports.validationErrorHandler = validationErrorHandler;
