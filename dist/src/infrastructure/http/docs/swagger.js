"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
exports.swaggerOptions = {
    routePrefix: '/docs',
    swagger: {
        info: {
            title: 'receivers-api',
            description: 'API with CRUD operations related receivers',
            version: '1.0.0'
        },
        schemes: ['http', 'https'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true
};
