import { GetAllReceiverInput } from "../dto/GetAllReceiverInput";
import { GetAllReceiverOutput } from "../dto/GetAllReceiverOutput";
import Receiver from "../Receiver";

export default interface ReceiverRepository {
    getAll(filters: GetAllReceiverInput): Promise<GetAllReceiverOutput>
    getById(id: number): Promise<Receiver>
    create(receiver: Receiver): Promise<number>
    update(receiver: Receiver): Promise<number>
    delete(idsToBeDeleted: number[]): Promise<void>
}