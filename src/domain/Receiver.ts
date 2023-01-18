import { PixKeyInvalidFormat } from "./errors/PixKeyInvalidFormat";
import { PixKeyType } from "./PixKeyType";
import { ReceiverStatus } from "./ReceiverStatus";

export default class Receiver {

    constructor(
        readonly id: number | undefined,
        readonly name: string,
        readonly email: string,
        readonly status: ReceiverStatus,
        readonly pixKeyType: PixKeyType,
        readonly pixKey: string,
    ){
        this.validate()
    }

    private validate(){
        const pixKeySchema = this.getFormatByPixType()
        const isValid = this.pixKey.match(pixKeySchema.regexPattern)
        if(!isValid){
            throw new PixKeyInvalidFormat(this.pixKeyType)
        }
    }

    private getFormatByPixType(){
        const schema = [
            { type:PixKeyType.CPF, regexPattern: /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/ },
            { type:PixKeyType.CNPJ,regexPattern: /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/ },
            { type:PixKeyType.EMAIL, regexPattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ },
            { type:PixKeyType.PHONE, regexPattern: /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/ },
            { type:PixKeyType.RANDOM_KEY, regexPattern: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i }
        ]
        return schema.find(pixKeySchema => pixKeySchema.type === this.pixKeyType)
    }
}