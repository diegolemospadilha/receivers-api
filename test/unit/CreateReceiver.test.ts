import { fakerBr } from "js-brasil"
import CreateReceiver from "../../src/application/CreateReceiver"
import { PixKeyInvalidFormat } from "../../src/domain/errors/PixKeyInvalidFormat"
import { PixKeyType } from "../../src/domain/PixKeyType"
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

    it.each(Object.values(PixKeyType))('Should not create a receiver when receiver pix key has an invalid format to pix key type %s', async (scenario) => {
        const fakerId = 71;
        const inputInvalid = ReceiverInputDummy.stub({
            pixKeyType: scenario,
            pixKey: scenario === 'EMAIL'? fakerBr.cpf() : fakerBr.email()
        });

        repositoryMock.getById = jest.fn().mockResolvedValue(null)
        repositoryMock.create = jest.fn().mockResolvedValue(fakerId)
        
        const useCase = new CreateReceiver(repositoryMock)

         expect(useCase.execute(inputInvalid))
            .rejects.toThrow(new PixKeyInvalidFormat(PixKeyType[inputInvalid.pixKeyType]))
        
        expect(repositoryMock.create).not.toBeCalled()
        expect(repositoryMock.getById).not.toBeCalled()
    })
})