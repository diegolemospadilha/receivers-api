import { ApplicationError } from "../../domain/errors/ApplicationError";

export function validationErrorHandler(
    error: Error | Error & { validation: any[] },
) {
    if ('validation' in error) {
        const errors = error.validation.map((err) => ({
          path: err.instancePath || undefined,
          message: err.message,
          ...err.params,
        }));

        return ApplicationError.badRequest(errors);
      }
}