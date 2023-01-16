import { Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";
import { PixKeyType } from "../../../domain/PixKeyType";
import { ReceiverStatus } from "../../../domain/ReceiverStatus";

export const receiverIdBaseSchema = Type.Object({
    id: Type.Integer({
        minimum: 1,
        description: 'Receiver`s id',
    })
})

export const receiverBaseSchema = Type.Object({
    name: Type.String({ description: 'Receiver`s name' }),
    email: Type.Optional(
        Type.String({
            maxLength: 250,
            description: 'Receiver`s email',
            format: 'email'
        }),
    ),
    status: Type.Enum(ReceiverStatus),
    pixKeyType: Type.Enum(PixKeyType),
    pixKey: Type.String({ description: 'Receiver`s pix key' }),
})

export const updateReceiverDoc: FastifySchema = {
    body: receiverBaseSchema,
    params: receiverIdBaseSchema
}