import { Static, Type } from "@sinclair/typebox";
import { FastifySchema } from "fastify";
import { PixKeyType } from "../../../domain/PixKeyType";
import { ReceiverStatus } from "../../../domain/ReceiverStatus";
import { customEnum } from "./CustomEnum";

export const receiverIdBaseSchema = Type.Object({
    id: Type.Integer({
        minimum: 1,
        description: 'Receiver`s id',
    })
})

export const receiverBaseSchema = Type.Object({
    name: Type.String({
        maxLength: 255,
        description: 'Receiver`s name' 
    }),
    email: Type.Optional(
        Type.String({
            maxLength: 250,
            description: 'Receiver`s email',
            format: 'email'
        }),
    ),
    status: customEnum(ReceiverStatus),
    pixKeyType: customEnum(PixKeyType),
    pixKey: Type.String({
        maxLength: 140,
        description: 'Receiver`s pix key' 
    }),
})

export const receiverResponseBaseSchema = Type.Object({
    id: Type.Integer({
        minimum: 1,
        description: 'Receiver`s id',
    }),
    name: Type.String({
        maxLength: 255,
        description: 'Receiver`s name' 
    }),
    email: Type.Optional(
        Type.String({
            maxLength: 250,
            description: 'Receiver`s email',
            format: 'email'
        }),
    ),
    status: customEnum(ReceiverStatus),
    pixKeyType: customEnum(PixKeyType),
    pixKey: Type.String({
        maxLength: 140,
        description: 'Receiver`s pix key' 
    }),
}, {
     description: 'Succesful Response'
})

export const getReceiversBaseSchema = Type.Object({
    name: Type.Optional(
        Type.String({
            maxLength: 255,
            description: 'Receiver`s name to be searched',
        })
    ),
    status: Type.Optional(customEnum(ReceiverStatus)),
    pixKeyType: Type.Optional(customEnum(PixKeyType)),
    pixKey: Type.Optional(
        Type.String({
            maxLength: 255,
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

export const receiverNotFoundSchema = Type.Object({
    statusCode: Type.Number({
        default: 404
    }),
    message: Type.String({
        default: 'Not found'
    }),
    details: Type.String({
        example: 'Receiver not found with id 100'
    })
}, {
    description: 'Receiver Not Found Response'
})

export const internalServerErrorSchema = Type.Object({
    statusCode: Type.Number({
        default: 500
    }),
    message: Type.String({
        default: 'Internal Error'
    }),
    details: Type.String({
        example: 'Internal Server Error'
    })
}, {
    description: 'Internal Server Error Response'
})

export const detailsArrayMessages = Type.Array(
    Type.Object({
        message: Type.String({}),
        missingProperty: Type.Optional(Type.String({})),
        allowedValues: Type.Optional(Type.Array(Type.String({}))),
    })
)

export const detailsMessage = Type.String({
    example: 'Internal Server Error'
})

export const badRequestErrorSchema = Type.Object({
    statusCode: Type.Number({
        default: 400
    }),
    message: Type.String({
        default: 'Bad Request'
    }),
    details: Type.Union([ detailsArrayMessages, detailsMessage])
}, {
    description: 'Bad Request Error Response'
})

export const getReceiversResponseSchema = Type.Object({
    totalPages: Type.Integer({
        description: 'Total pages to be searched',
        example: 2
    }),
    currentPage: Type.Integer({
        description: 'Current search page',
        example: 1
    }),
    data: Type.Array(receiverResponseBaseSchema) 
})

export const deleteReceiverInBatchesResponseSchema = Type.Null({
    description: 'Receivers successfully deleted'
})


export const getReceiversDoc: FastifySchema = {
    querystring: getReceiversBaseSchema,
    response: {
        [200]: getReceiversResponseSchema,
        [400]: badRequestErrorSchema,
        [500]: internalServerErrorSchema,
    }
}

export const getReceiverByIdDoc: FastifySchema = {
    params: receiverIdBaseSchema,
    response: {
        [200]: receiverResponseBaseSchema,
        [400]: badRequestErrorSchema,
        [404]: receiverNotFoundSchema,
        [500]: internalServerErrorSchema,
    }
}

export const createReceiverDoc: FastifySchema = {
    body: receiverBaseSchema,
    response: {
        [200]: receiverResponseBaseSchema,
        [400]: badRequestErrorSchema,
        [500]: internalServerErrorSchema,
    }
}

export const updateReceiverDoc: FastifySchema = {
    body: receiverBaseSchema,
    params: receiverIdBaseSchema,
    response: {
        [200]: receiverResponseBaseSchema,
        [400]: badRequestErrorSchema,
        [404]: receiverNotFoundSchema,
        [500]: internalServerErrorSchema,
    }
}

export const deleteReceiversInBatchDoc: FastifySchema = {
    body: deleteReceiversInBatches,
    response: {
        [204]: deleteReceiverInBatchesResponseSchema,
        [400]: badRequestErrorSchema,
        [500]: internalServerErrorSchema,
    }
}