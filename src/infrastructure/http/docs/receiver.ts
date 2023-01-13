import { Type } from "@sinclair/typebox";
import { PixKeyType } from "../../../domain/PixKeyType";
import { ReceiverStatus } from "../../../domain/ReceiverStatus";

export const receiverBaseSchema = Type.Object({
    name: Type.String({ description: 'Receiver`s name' }),
    email: Type.String({
        maxLength: 250,
        description: 'Receiver`s email',
        format: 'email'
    }),
    status: Type.Enum(ReceiverStatus),
    pixKeyType: Type.Enum(PixKeyType),
    pixKey: Type.String({ description: 'Receiver`s pix key' }),
})