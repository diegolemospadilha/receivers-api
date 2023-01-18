import { ReceiverInput } from "../domain/dto/ReceiverInput";
import { ReceiverOutput } from "../domain/dto/ReceiverOutput";
import { ReceiverNotFound } from "../domain/errors/ReceiverNotFound";
import { domainToOutput, inputToDomain } from "../domain/mapper/ReceiverMapper";
import ReceiverRepository from "../domain/repository/ReceiverRepository";

export default class GetReceiverById {
    constructor(
        readonly repository: ReceiverRepository
    ){}

    async execute(id: number): Promise<ReceiverOutput> {
            
        const receiver = await this.repository.getById(id);

        if(!receiver){
            throw new ReceiverNotFound(id)
        }

        return domainToOutput(receiver);
    }
}