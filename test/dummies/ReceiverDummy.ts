import { fakerBr } from "js-brasil";
import { ReceiverInput } from "../../src/domain/dto/ReceiverInput";
import { PixKeyType } from "../../src/domain/PixKeyType";
import Receiver from "../../src/domain/Receiver";
import { ReceiverStatus } from "../../src/domain/ReceiverStatus";

export class ReceiverDummy {   
    static stub(overrides?: Partial<ReceiverInput>): Receiver {
        const fakerReceiver = fakerBr.pessoa()
        return new Receiver(
             overrides.id ?? undefined,
             overrides.name ?? fakerReceiver.nome,
             overrides.email ?? fakerReceiver.email,
             ReceiverStatus[overrides.status] ?? 'DRAFT',   
             PixKeyType[overrides.pixKeyType] ?? 'EMAIL',
             overrides.pixKey ?? fakerReceiver.email
        )
    }
}