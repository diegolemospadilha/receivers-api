import { fakerBr } from "js-brasil";
import { ReceiverInput } from "../../src/domain/dto/ReceiverInput";

export class ReceiverInputDummy {   
    static stub(id?: number): ReceiverInput {
        const fakerReceiver = fakerBr.pessoa()
        const input = {
                id: id ?? undefined,
                name: fakerReceiver.nome,
                status: 'DRAFT',
                email: fakerBr.email(),
                pixKeyType: 'EMAIL',
                pixKey: fakerBr.email()
            }
        return input;
    }
}