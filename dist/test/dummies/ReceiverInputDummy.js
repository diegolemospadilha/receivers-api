"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiverInputDummy = void 0;
const js_brasil_1 = require("js-brasil");
class ReceiverInputDummy {
    static stub(id) {
        const fakerReceiver = js_brasil_1.fakerBr.pessoa();
        const input = {
            id: id !== null && id !== void 0 ? id : undefined,
            name: fakerReceiver.nome,
            status: 'DRAFT',
            email: js_brasil_1.fakerBr.email(),
            pixKeyType: 'EMAIL',
            pixKey: js_brasil_1.fakerBr.email()
        };
        return input;
    }
}
exports.ReceiverInputDummy = ReceiverInputDummy;
