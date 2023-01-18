import { PixKeyType } from "../PixKeyType";
import { ApplicationError } from "./ApplicationError";

export class PixKeyInvalidFormat extends ApplicationError {

    constructor(readonly type: PixKeyType){
        super('Bad Request',`Pix key sent is invalid to pix key type ${type}`, 400);      
    }
}