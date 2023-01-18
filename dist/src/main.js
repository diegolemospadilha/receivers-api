"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const CreateReceiver_1 = __importDefault(require("./application/CreateReceiver"));
const DeleteReceiversInBatches_1 = __importDefault(require("./application/DeleteReceiversInBatches"));
const GetAllReceivers_1 = __importDefault(require("./application/GetAllReceivers"));
const UpdateReceiver_1 = __importDefault(require("./application/UpdateReceiver"));
const ReceiverController_1 = __importDefault(require("./infrastructure/controllers/ReceiverController"));
const ErrorHandler_1 = __importDefault(require("./infrastructure/handler/ErrorHandler"));
const ValidationHandler_1 = require("./infrastructure/handler/ValidationHandler");
const FastifyAdapter_1 = __importDefault(require("./infrastructure/http/FastifyAdapter"));
const ReceiverRepositoryDatabase_1 = require("./infrastructure/repository/database/ReceiverRepositoryDatabase");
const httpServer = new FastifyAdapter_1.default();
Promise.resolve(httpServer.loadSwagger());
httpServer.app.setErrorHandler((0, ErrorHandler_1.default)([
    ValidationHandler_1.validationErrorHandler,
]));
const repository = new ReceiverRepositoryDatabase_1.ReceiverRepositoryDatabase();
const createReceiver = new CreateReceiver_1.default(repository);
const getAllReceiver = new GetAllReceivers_1.default(repository);
const updateReceiver = new UpdateReceiver_1.default(repository);
const deleteReceiverInBatchs = new DeleteReceiversInBatches_1.default(repository);
const receiverController = new ReceiverController_1.default(httpServer, createReceiver, getAllReceiver, updateReceiver, deleteReceiverInBatchs);
const port = (_a = parseInt(process.env.PORT)) !== null && _a !== void 0 ? _a : 3000;
httpServer.listen(port);
