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

export const getReceiversBaseSchema = Type.Object({
    name: Type.Optional(
        Type.String({
            minimum: 1,
            description: 'Receiver`s name to be searched',
        })
    ),
    status: Type.Optional(
        Type.String({
            minimum: 1,
            description: 'Receiver`s status to be searched',
        })
    ),
    pixKeyType: Type.Optional(
        Type.String({
            minimum: 1,
            description: 'Receiver`s pix key type to be searched',
        })
    ),
    pixKey: Type.Optional(
        Type.String({
            minimum: 1,
            description: 'Receiver`s pix key to be searched',
        })
    ),
    page: Type.Optional(
        Type.Integer({
            minimum: 1,
            description: 'Current search page',
            default: 1
        })
    )
})

export const deleteReceiversInBatches = Type.Object({
    ids: Type.Array(
        Type.Number({
            minimum: 1
        }),
        {
         uniqueItems: true,
         minItems:1,
         description: 'A list with receiver`s id to be deleted'
        }
    ), 
})

export const getReceiversDoc: FastifySchema = {
    querystring: getReceiversBaseSchema
}

export const updateReceiverDoc: FastifySchema = {
    body: receiverBaseSchema,
    params: receiverIdBaseSchema
}

export const deleteReceiversInBatchDoc: FastifySchema = {
    body: deleteReceiversInBatches,
}