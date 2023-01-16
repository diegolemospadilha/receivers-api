import CreateReceiver from "../../application/CreateReceiver";
import UpdateReceiver from "../../application/UpdateReceiver";
import { receiverBaseSchema, updateReceiverDoc } from "../http/docs/receiver";
import HttpServer from "../http/HttpServer";

export default class ReceiverController {
    constructor(
        readonly httpServer: HttpServer,
        readonly createReceiverUseCase: CreateReceiver,
        readonly updateReceiverUseCase: UpdateReceiver
    ){
        httpServer.on("post", "/receivers", {
            schema: {
                body: receiverBaseSchema,
            }
        },
            async function (params: any, body: any) {
            const data = await createReceiverUseCase.execute(body);
            return { data, status: 201 };
        });

        httpServer.on("put", "/receivers/:id", {
            schema: updateReceiverDoc
        },
            async function (params: any, body: any) {
            const input = {
                id: parseInt(params.id),
                ...body
            }

            const data = await updateReceiverUseCase.execute(input);
            return { data, status: 200 };
        });
    }
      
}