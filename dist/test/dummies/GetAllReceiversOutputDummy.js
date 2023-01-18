"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllReceiverOutputDummy = void 0;
const ReceiverInputDummy_1 = require("./ReceiverInputDummy");
class GetAllReceiverOutputDummy {
    static stub() {
        const output = {
            currentPage: 1,
            totalPages: 1,
            data: [
                ReceiverInputDummy_1.ReceiverInputDummy.stub()
            ]
        };
        return output;
    }
}
exports.GetAllReceiverOutputDummy = GetAllReceiverOutputDummy;
