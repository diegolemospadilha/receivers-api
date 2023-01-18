"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReceiversInBatchDoc = exports.updateReceiverDoc = exports.createReceiverDoc = exports.getReceiversDoc = exports.deleteReceiverInBatchesResponseSchema = exports.getReceiversResponseSchema = exports.badRequestErrorSchema = exports.internalServerErrorSchema = exports.receiverNotFoundSchema = exports.deleteReceiversInBatches = exports.getReceiversBaseSchema = exports.receiverResponseBaseSchema = exports.receiverBaseSchema = exports.receiverIdBaseSchema = void 0;
const typebox_1 = require("@sinclair/typebox");
const PixKeyType_1 = require("../../../domain/PixKeyType");
const ReceiverStatus_1 = require("../../../domain/ReceiverStatus");
exports.receiverIdBaseSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Integer({
        minimum: 1,
        description: 'Receiver`s id',
    })
});
exports.receiverBaseSchema = typebox_1.Type.Object({
    name: typebox_1.Type.String({
        maxLength: 255,
        description: 'Receiver`s name'
    }),
    email: typebox_1.Type.Optional(typebox_1.Type.String({
        maxLength: 250,
        description: 'Receiver`s email',
        format: 'email'
    })),
    status: typebox_1.Type.Enum(ReceiverStatus_1.ReceiverStatus),
    pixKeyType: typebox_1.Type.Enum(PixKeyType_1.PixKeyType),
    pixKey: typebox_1.Type.String({
        maxLength: 255,
        description: 'Receiver`s pix key'
    }),
});
exports.receiverResponseBaseSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Integer({
        minimum: 1,
        description: 'Receiver`s id',
    }),
    name: typebox_1.Type.String({
        maxLength: 255,
        description: 'Receiver`s name'
    }),
    email: typebox_1.Type.Optional(typebox_1.Type.String({
        maxLength: 250,
        description: 'Receiver`s email',
        format: 'email'
    })),
    status: typebox_1.Type.Enum(ReceiverStatus_1.ReceiverStatus),
    pixKeyType: typebox_1.Type.Enum(PixKeyType_1.PixKeyType),
    pixKey: typebox_1.Type.String({
        maxLength: 255,
        description: 'Receiver`s pix key'
    }),
}, {
    description: 'Succesful Response'
});
exports.getReceiversBaseSchema = typebox_1.Type.Object({
    name: typebox_1.Type.Optional(typebox_1.Type.String({
        maxLength: 255,
        description: 'Receiver`s name to be searched',
    })),
    status: typebox_1.Type.Optional(typebox_1.Type.String({
        description: 'Receiver`s status to be searched',
    })),
    pixKeyType: typebox_1.Type.Optional(typebox_1.Type.String({
        minimum: 1,
        description: 'Receiver`s pix key type to be searched',
    })),
    pixKey: typebox_1.Type.Optional(typebox_1.Type.String({
        maxLength: 255,
        description: 'Receiver`s pix key to be searched',
    })),
    page: typebox_1.Type.Optional(typebox_1.Type.Integer({
        minimum: 1,
        description: 'Current search page',
        default: 1
    }))
});
exports.deleteReceiversInBatches = typebox_1.Type.Object({
    ids: typebox_1.Type.Array(typebox_1.Type.Number({
        minimum: 1
    }), {
        uniqueItems: true,
        minItems: 1,
        description: 'A list with receiver`s id to be deleted'
    }),
});
exports.receiverNotFoundSchema = typebox_1.Type.Object({
    statusCode: typebox_1.Type.Number({
        default: 404
    }),
    message: typebox_1.Type.String({
        default: 'Not found'
    }),
    details: typebox_1.Type.String({
        example: 'Receiver not found with id 100'
    })
}, {
    description: 'Receiver Not Found Response'
});
exports.internalServerErrorSchema = typebox_1.Type.Object({
    statusCode: typebox_1.Type.Number({
        default: 500
    }),
    message: typebox_1.Type.String({
        default: 'Internal Error'
    }),
    details: typebox_1.Type.String({
        example: 'Internal Server Error'
    })
}, {
    description: 'Internal Server Error Response'
});
exports.badRequestErrorSchema = typebox_1.Type.Object({
    statusCode: typebox_1.Type.Number({
        default: 400
    }),
    message: typebox_1.Type.String({
        default: 'Bad Request'
    }),
    details: typebox_1.Type.Array(typebox_1.Type.Object({
        message: typebox_1.Type.String({}),
        missingProperty: typebox_1.Type.Optional(typebox_1.Type.String({})),
        allowedValue: typebox_1.Type.Optional(typebox_1.Type.String({})),
    }))
}, {
    description: 'Bad Request Error Response'
});
exports.getReceiversResponseSchema = typebox_1.Type.Object({
    totalPages: typebox_1.Type.Integer({
        description: 'Total pages to be searched',
        example: 2
    }),
    currentPage: typebox_1.Type.Integer({
        description: 'Current search page',
        example: 1
    }),
    data: typebox_1.Type.Array(exports.receiverResponseBaseSchema)
});
exports.deleteReceiverInBatchesResponseSchema = typebox_1.Type.Null({
    description: 'Receivers successfully deleted'
});
exports.getReceiversDoc = {
    querystring: exports.getReceiversBaseSchema,
    response: {
        [200]: exports.getReceiversResponseSchema,
        [400]: exports.badRequestErrorSchema,
        [500]: exports.internalServerErrorSchema,
    }
};
exports.createReceiverDoc = {
    body: exports.receiverBaseSchema,
    response: {
        [200]: exports.receiverResponseBaseSchema,
        [400]: exports.badRequestErrorSchema,
        [500]: exports.internalServerErrorSchema,
    }
};
exports.updateReceiverDoc = {
    body: exports.receiverBaseSchema,
    params: exports.receiverIdBaseSchema,
    response: {
        [200]: exports.receiverResponseBaseSchema,
        [400]: exports.badRequestErrorSchema,
        [404]: exports.receiverNotFoundSchema,
        [500]: exports.internalServerErrorSchema,
    }
};
exports.deleteReceiversInBatchDoc = {
    body: exports.deleteReceiversInBatches,
    response: {
        [204]: exports.deleteReceiverInBatchesResponseSchema,
        [400]: exports.badRequestErrorSchema,
        [500]: exports.internalServerErrorSchema,
    }
};
