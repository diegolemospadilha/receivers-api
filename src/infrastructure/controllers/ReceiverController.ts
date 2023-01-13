import { FastifyReply, FastifyRequest } from "fastify";
import CreateReceiver from "../../application/CreateReceiver";
import { receiverBaseSchema } from "../http/docs/receiver";
import HttpServer from "../http/HttpServer";

export default class ReceiverController {
    constructor(
        readonly httpServer: HttpServer,
        readonly createReceiverUseCase: CreateReceiver
    ){
        httpServer.on("post", "/receivers", {
            schema: {
                body: receiverBaseSchema
            }
        },
            async function (params: any, body: any) {
            const data = await createReceiverUseCase.execute(body);
            return { data, status: 201 };
        });
    }
      
}