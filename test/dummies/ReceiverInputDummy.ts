import { fakerBr } from "js-brasil";
import { ReceiverInput } from "../../src/domain/dto/ReceiverInput";
import { PixKeyType } from "../../src/domain/PixKeyType";

export class ReceiverInputDummy {   
    static stub(overrides?:Partial<ReceiverInput>): ReceiverInput {
        const fakerReceiver = fakerBr.pessoa()
        const input = {
                id: overrides?.id ?? undefined,
                name: overrides?.name ?? fakerReceiver.nome,
                status: overrides?.status ?? 'DRAFT',
                email: overrides?.email ?? fakerBr.email(),
                pixKeyType: overrides?.pixKeyType ?? 'EMAIL',
                pixKey: overrides?.pixKey ?? fakerBr.email()
            }
        return input;
    }
    static stubByPixKeyType(pixKeyType: PixKeyType): ReceiverInput {
        const fakerReceiver = fakerBr.pessoa()
        const input = {
                id: undefined,
                name: fakerReceiver.nome,
                status: 'DRAFT',
                email: fakerBr.email(),
                pixKeyType: pixKeyType,
                pixKey: getPixKeyValueByType(PixKeyType[pixKeyType])
            }
        return input;
    }
}

function getPixKeyValueByType(pixKeyType: PixKeyType): string {
    const schema = [
        { type:PixKeyType.CPF, value:  fakerBr.cpf()},
        { type:PixKeyType.CNPJ,value:  fakerBr.cnpj()},
        { type:PixKeyType.EMAIL, value: fakerBr.email()},
        { type:PixKeyType.PHONE, value:  `+55${fakerBr.celular().replace(/\D/g,'')}`},
        { type:PixKeyType.RANDOM_KEY, value: `a234567d-a12a-a12a-a12a-aa123456789a` }
    ]
    return schema.find(pixKeySchema => pixKeySchema.type === pixKeyType).value
}

