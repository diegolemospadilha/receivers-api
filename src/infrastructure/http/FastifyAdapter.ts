import fastify from "fastify";
import HttpServer from "./HttpServer";

export default class FastifyAdapter implements HttpServer {
    readonly app: any;

	constructor () {
		this.app = fastify({ logger: { level: 'info' } });
	}

    on(method: string, url: string, schema: any, callback: Function): void {
        this.app[method](url, schema, async function (req: any, res: any) {
			const { status, data } = await callback(req.params, req.body);
			res.status(status).send(data);
		});
    }

    listen(port: number): void {
        this.app.listen(port);
    }
}