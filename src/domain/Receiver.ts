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
    ){}
}