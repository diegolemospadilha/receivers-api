require('dotenv').config()
import fastify from "fastify";
import { swaggerOptions } from "./docs/swagger";
import HttpServer from "./HttpServer";
export default class FastifyAdapter implements HttpServer {
    readonly app: any;

	 constructor () {
		this.app = fastify({ logger: { level: 'info' } })
	}

    on(method: string, url: string, schema: any, callback: Function): void {
         this.app[method](url, schema, async function (req: any, res: any) {
			const { status, data } = await callback(req);
			res.status(status).send(data);
		});
    }

    listen(port: number): void {
        this.app.listen(port, process.env.APP_HOST || '0.0.0.0');
    }

    public async loadSwagger(){
        Promise.all([
            this.app.register(require('fastify-cors'), { 
                origin: [
                `http://localhost:${process.env.PORT}`,
                `http://127.0.0.1:${process.env.PORT}`, 
                process.env.APP_HOST
                ],
                methods: ['GET', 'PUT', 'POST', 'DELETE']
            }),
            this.app.register(require('fastify-swagger'), swaggerOptions)   
        ])
        
    }
}