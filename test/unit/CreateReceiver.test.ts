import CreateReceiver from "../../src/application/CreateReceiver"
import ReceiverRepository from "../../src/domain/repository/ReceiverRepository"
import { ReceiverDummy } from "../dummies/ReceiverDummy"
import { ReceiverInputDummy } from "../dummies/ReceiverInputDummy"

describe('Create receiver use case unit tests', () => {

    const repositoryMock: ReceiverRepository = {
        getById: jest.fn(),
        create: jest.fn(),
        getAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
    it('Should create a new receiver', async () => {
        const input = ReceiverInputDummy.stub();
        const fakerId = 71;
        const receiver = ReceiverDummy.stub(input);
        repositoryMock.create = jest.fn().mockResolvedValue(fakerId)
        repositoryMock.getById = jest.fn().mockResolvedValue(receiver)
        const useCase = new CreateReceiver(repositoryMock)

        await useCase.execute(input);

        expect(repositoryMock.create).toBeCalledTimes(1)
        expect(repositoryMock.create).toHaveBeenCalledWith(receiver)
        expect(repositoryMock.getById).toBeCalledTimes(1)
        expect(repositoryMock.getById).toHaveBeenCalledWith(fakerId)
    })
})