import { ApplicationError } from "./ApplicationError";

export class ReceiverNotFound extends ApplicationError {

    constructor(readonly id: number){
        super('Not found',`Receiver not found with id: ${id}`, 404);      
    }
}