import { DeleteReceiversByBatchInput } from "../domain/dto/DeleteReceiversByBatchInput";
import ReceiverRepository from "../domain/repository/ReceiverRepository";

export default class DeleteReceiversInBatches {
    constructor(
        readonly repository: ReceiverRepository
    ){}

    async execute(input: DeleteReceiversByBatchInput): Promise<void> {
        await this.repository.delete(input.ids);
    }
}