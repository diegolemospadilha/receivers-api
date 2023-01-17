import DeleteReceiversInBatches from "../../src/application/DeleteReceiversInBatches"
import ReceiverRepository from "../../src/domain/repository/ReceiverRepository"

describe('Delete receivers in batches use case unit tests', () => {

    const repositoryMock: ReceiverRepository = {
        getById: jest.fn(),
        create: jest.fn(),
        getAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
    it('Should delete receivers in batches', async () => {
        const input = {
            ids: [ 71, 72, 73 ]
        }
        repositoryMock.delete = jest.fn().mockImplementationOnce(() => Promise.resolve());
        
        const useCase = new DeleteReceiversInBatches(repositoryMock)

        await useCase.execute(input);

        expect(repositoryMock.delete).toBeCalledTimes(1)
    })
})