require('dotenv').config()
import CreateReceiver from "./application/CreateReceiver";
import DeleteReceiversByBatch from "./application/DeleteReceiversInBatches";
import GetAllReceivers from "./application/GetAllReceivers";
import GetReceiverById from "./application/GetReceiverById";
import UpdateReceiver from "./application/UpdateReceiver";
import ReceiverController from "./infrastructure/controllers/ReceiverController";
import composeErrorHandler from "./infrastructure/handler/ErrorHandler";
import { validationErrorHandler } from "./infrastructure/handler/ValidationHandler";
import FastifyAdapter from "./infrastructure/http/FastifyAdapter";
import { ReceiverRepositoryDatabase } from "./infrastructure/repository/database/ReceiverRepositoryDatabase";

const httpServer = new FastifyAdapter();

Promise.resolve(httpServer.loadSwagger())

httpServer.app.setErrorHandler(composeErrorHandler([
    validationErrorHandler,
]))

const repository = new ReceiverRepositoryDatabase()

const createReceiver = new CreateReceiver(repository)
const getAllReceiver = new GetAllReceivers(repository)

const updateReceiver = new UpdateReceiver(repository)
const deleteReceiverInBatchs = new DeleteReceiversByBatch(repository)
const getReceiverById = new GetReceiverById(repository)

const receiverController = new ReceiverController(
    httpServer, 
    createReceiver,
    getAllReceiver,
    updateReceiver,
    deleteReceiverInBatchs,
    getReceiverById
)

const port = parseInt(process.env.PORT) ?? 3000
httpServer.listen(port)