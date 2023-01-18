import GetReceiverById from "../../src/application/GetReceiverById"
import { ReceiverNotFound } from "../../src/domain/errors/ReceiverNotFound"
import ReceiverRepository from "../../src/domain/repository/ReceiverRepository"
import { ReceiverDummy } from "../dummies/ReceiverDummy"

describe('Get receiver by id use case unit tests', () => {

    const repositoryMock: ReceiverRepository = {
        getById: jest.fn(),
        create: jest.fn(),
        getAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
    it('Should get receiver by its id', async () => {
        const input = 71;
        const receiver = ReceiverDummy.stub({id: input});
        repositoryMock.getById = jest.fn().mockResolvedValue(receiver)
        
        const useCase = new GetReceiverById(repositoryMock)

        await useCase.execute(input);

        expect(repositoryMock.getById).toBeCalledTimes(1)
        expect(repositoryMock.getById).toHaveBeenCalledWith(input)
    })

    it('Should throw an error when receiver is not found', async () => {
        const input = 71;

        repositoryMock.getById = jest.fn().mockResolvedValue(null)

        const useCase = new GetReceiverById(repositoryMock)

         expect(useCase.execute(input))
            .rejects.toThrow(new ReceiverNotFound(input))
        
        expect(repositoryMock.getById).toBeCalledTimes(1)
        expect(repositoryMock.getById).toHaveBeenCalledWith(input)
    })
})