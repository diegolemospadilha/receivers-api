import { fakerBr } from "js-brasil"
import GetAllReceivers from "../../src/application/GetAllReceivers"
import ReceiverRepository from "../../src/domain/repository/ReceiverRepository"
import { GetAllReceiverOutputDummy } from "../dummies/GetAllReceiversOutputDummy"

describe('Get all receivers use case unit tests', () => {

    const repositoryMock: ReceiverRepository = {
        getById: jest.fn(),
        create: jest.fn(),
        getAll: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
    }
    it('Should get all receivers by filters', async () => {
        const input = {
            page: 1,
            name: fakerBr.pessoa().nome
        }
        const receivers = GetAllReceiverOutputDummy.stub();

        repositoryMock.getAll = jest.fn().mockResolvedValue(receivers)
        
        const useCase = new GetAllReceivers(repositoryMock)

        await useCase.execute(input);

        expect(repositoryMock.getAll).toBeCalledTimes(1)
    })
})