import UpdateReceiver from "../../src/application/UpdateReceiver"
import { ReceiverNotFound } from "../../src/domain/errors/ReceiverNotFound"
import ReceiverRepository from "../../src/domain/repository/ReceiverRepository"
import { ReceiverDummy } from "../dummies/ReceiverDummy"
import { ReceiverInputDummy } from "../dummies/ReceiverInputDummy"

describe('Update receiver use case unit tests', () => {

    const repositoryMock: ReceiverRepository = {
        getById: jest.fn(),
        create: jest.fn(),
        getAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
    it('Should update a receiver', async () => {
        const fakerId = 71;
        const input = ReceiverInputDummy.stub(71);
        const receiver = ReceiverDummy.stub(input);
        repositoryMock.getById = jest.fn().mockResolvedValue(receiver)
        repositoryMock.update = jest.fn().mockResolvedValue(fakerId)
        
        const useCase = new UpdateReceiver(repositoryMock)

        await useCase.execute(input);

        expect(repositoryMock.update).toBeCalledTimes(1)
        expect(repositoryMock.update).toHaveBeenCalledWith(receiver)
        expect(repositoryMock.getById).toBeCalledTimes(2)
        expect(repositoryMock.getById).toHaveBeenCalledWith(fakerId)
    })

    it('Should not update a receiver when receiver is not found', async () => {
        const fakerId = 71;
        const input = ReceiverInputDummy.stub(71);

        repositoryMock.getById = jest.fn().mockResolvedValue(null)
        repositoryMock.update = jest.fn().mockResolvedValue(fakerId)
        
        const useCase = new UpdateReceiver(repositoryMock)

         expect(useCase.execute(input))
            .rejects.toThrow(new ReceiverNotFound(fakerId))
        
        expect(repositoryMock.update).not.toBeCalled()
        expect(repositoryMock.getById).toBeCalledTimes(1)
        expect(repositoryMock.getById).toHaveBeenCalledWith(fakerId)
    })
})