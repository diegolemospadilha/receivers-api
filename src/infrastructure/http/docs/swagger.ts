export const swaggerOptions = {
  routePrefix: '/docs',
  openapi: {
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
}