import Receiver from "../Receiver";

export default interface ReceiverRepository {
    getAll(): Promise<Receiver[]>
    getById(id: number): Promise<Receiver>
    create(receiver: Receiver): Promise<number>
}