import { GetAllReceiverInput } from "../domain/dto/GetAllReceiverInput";
import { GetAllReceiverOutput } from "../domain/dto/GetAllReceiverOutput";
import { ReceiverOutput } from "../domain/dto/ReceiverOutput";
import ReceiverRepository from "../domain/repository/ReceiverRepository";

export default class GetAllReceivers {
    constructor(
        readonly repository: ReceiverRepository
    ){}

    async execute(input: GetAllReceiverInput): Promise<GetAllReceiverOutput> {
        return await this.repository.getAll(input);
    }
}