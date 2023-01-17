import { GetAllReceiverOutput } from "../../src/domain/dto/GetAllReceiverOutput";
import { ReceiverInputDummy } from "./ReceiverInputDummy";

export class GetAllReceiverOutputDummy {   
    static stub(): GetAllReceiverOutput {
        const output = {
            currentPage: 1,
            totalPages: 1,
            data: [
                ReceiverInputDummy.stub()
            ]
        }
        return output;
    }
}