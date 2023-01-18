import { FastifyReply, FastifyRequest } from "fastify";
import { ApplicationError } from "../../domain/errors/ApplicationError";

export type ErrorHandler = (error: Error, request: FastifyRequest) => Error | undefined;

export default function composeErrorHandler(errorHandlers: ErrorHandler[] = []) {
    return function errorHandler(
        error: ApplicationError,
        request: FastifyRequest,
        reply: FastifyReply,
      ) {
        let handledError;
    
        for (const handler of errorHandlers) {
          handledError = handler(error, request);
    
          if (handledError) break;
        }
    
        handledError = handledError || error;

        if (handledError instanceof ApplicationError) {
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
