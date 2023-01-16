import CreateReceiver from "../../application/CreateReceiver";
import GetAllReceivers from "../../application/GetAllReceivers";
import UpdateReceiver from "../../application/UpdateReceiver";
import { getReceiversDoc, receiverBaseSchema, updateReceiverDoc } from "../http/docs/receiver";
import HttpServer from "../http/HttpServer";

export default class ReceiverController {
    constructor(
        readonly httpServer: HttpServer,
        readonly createReceiverUseCase: CreateReceiver,
        readonly getAllReceiversUseCase: GetAllReceivers,
        readonly updateReceiverUseCase: UpdateReceiver
    ){
        httpServer.on("post", "/receivers", {
            schema: {
                body: receiverBaseSchema,
            }
        },
            async function (request: any) {
            const { body } = request;
            const data = await createReceiverUseCase.execute(body);
            return { data, status: 201 };
        });

        httpServer.on("get", "/receivers", {
            schema: getReceiversDoc,
        },
            async function (request: any) {
            const { query } = request;
            const input = {
                name: query.name,
                status: query.status,
                pixKeyType: query.pixKeyType,
                pixKey: query.pixKey,
                page: parseInt(query.page)
            }
            const data = await getAllReceiversUseCase.execute(input);
            return { data, status: 200 };
        });

        httpServer.on("put", "/receivers/:id", {
            schema: updateReceiverDoc
        },
            async function (request: any) {
            const { params, body } = request;
            const input = {
                id: parseInt(params.id),
                ...body
            }

            const data = await updateReceiverUseCase.execute(input);
            return { data, status: 200 };
        });
    }
      
}