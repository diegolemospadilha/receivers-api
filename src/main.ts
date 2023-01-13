import CreateReceiver from "./application/CreateReceiver";
import ReceiverController from "./infrastructure/controllers/ReceiverController";
import FastifyAdapter from "./infrastructure/http/FastifyAdapter";
import { ReceiverRepositoryDatabase } from "./infrastructure/repository/database/ReceiverRepositoryDatabase";

const httpServer = new FastifyAdapter();

const repository = new ReceiverRepositoryDatabase()

const createReceiver = new CreateReceiver(repository)
const receiverController = new ReceiverController(httpServer, createReceiver)

httpServer.listen(3000)