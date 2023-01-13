import { ReceiverInput } from "../domain/dto/ReceiverInput";
import { ReceiverOutput } from "../domain/dto/ReceiverOutput";
import { domainToOutput, inputToDomain } from "../domain/mapper/ReceiverMapper";
import ReceiverRepository from "../domain/repository/ReceiverRepository";

export default class CreateReceiver {
    constructor(
        readonly repository: ReceiverRepository
    ){}

    async execute(input: ReceiverInput): Promise<ReceiverOutput> {
        const receiverToCreated = inputToDomain(input);

        const idCreated = await this.repository.create(receiverToCreated);

        const createdReceived = await this.repository.getById(idCreated);

        return domainToOutput(createdReceived);
    }
}