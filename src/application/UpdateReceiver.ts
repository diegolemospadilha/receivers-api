import { ReceiverInput } from "../domain/dto/ReceiverInput";
import { ReceiverOutput } from "../domain/dto/ReceiverOutput";
import { ReceiverNotFound } from "../domain/errors/ReceiverNotFound";
import { domainToOutput, inputToDomain } from "../domain/mapper/ReceiverMapper";
import ReceiverRepository from "../domain/repository/ReceiverRepository";

export default class UpdateReceiver {
    constructor(
        readonly repository: ReceiverRepository
    ){}

    async execute(input: ReceiverInput): Promise<ReceiverOutput> {
            
        const receiverExists = await this.repository.getById(input.id);

        if(!receiverExists){
            throw new ReceiverNotFound(input.id)
        }

        const receiverToUpdated = inputToDomain(input);

        const idUpdated = await this.repository.update(receiverToUpdated);

        const receiverUpdated = await this.repository.getById(idUpdated);
        return domainToOutput(receiverUpdated);
    }
}