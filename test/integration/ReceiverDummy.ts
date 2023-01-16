import { fakerBr } from "js-brasil";
import { ReceiverInput } from "../../src/domain/dto/ReceiverInput";

export class ReceiverDummy {   
    static stub(): ReceiverInput {
        const fakerReceiver = fakerBr.pessoa()
        const input = {
                name: fakerReceiver.nome,
                status: 'DRAFT',
                email: fakerReceiver.email,
                pixKeyType: 'EMAIL',
                pixKey: fakerReceiver.email
            }
        return input;
    }
}