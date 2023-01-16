import { ReceiverOutput } from "./ReceiverOutput"

export type GetAllReceiverOutput = {
    data: ReceiverOutput[],
    currentPage: number,
    totalPages: number,
}