import { fakerBr } from 'js-brasil';
import { ReceiverInput } from '../../src/domain/dto/ReceiverInput';
import { PixKeyType } from '../../src/domain/PixKeyType';
import { ReceiverInputDummy } from '../dummies/ReceiverInputDummy';
require('dotenv').config()
import { request } from './setup';
describe('Create receiver integration tests', () => {

    let input: ReceiverInput;

    beforeEach(() => {
        input = ReceiverInputDummy.stub();
    })

    it.each(Object.values(PixKeyType))('should create a new receiver with pix key type %s', async (pixKeyType) => {

        input = ReceiverInputDummy.stubByPixKeyType(pixKeyType)
        
        const { status, body } = await request.post(`/receivers`).send(input);

        expect(status).toBe(201)
        expect(body.id).toBeDefined()
        expect(body.name).toEqual(input.name)
        expect(body.status).toEqual(input.status)
        expect(body.pixKeyType).toEqual(input.pixKeyType)
        expect(body.pixKey).toEqual(input.pixKey)         
    })

    it.each(Object.values(PixKeyType))('should return status code 400 when receiver pix key has an invalid format to pix key type %s', async (pixKeyType) => {
        const inputInvalid = ReceiverInputDummy.stub({
            pixKeyType: pixKeyType,
            pixKey: pixKeyType === 'EMAIL' ? fakerBr.cpf() : fakerBr.email()
        });
        
        const { status, body } = await request.post(`/receivers`).send(inputInvalid);
        
        expect(status).toBe(400)
        expect(body.statusCode).toBeDefined()
        expect(body.message).toEqual('Bad Request')
        expect(body.details).toEqual(`Pix key sent is invalid to pix key type ${pixKeyType}`) 
    })

    const scenarios = [
       'name',
       'status',
       'pixKeyType',
       'pixKey',
    ]
    it.each(scenarios)('should return status code 400 when required field %s is not send', async (scenario) => {

        delete input[scenario]

        const { status, body } = await request.post(`/receivers`).send(input);

        expect(status).toBe(400)
        expect(body.statusCode).toBeDefined()
        expect(body.message).toEqual('Bad Request')
        expect(body.details).toBeDefined()          
    })

    it.each(scenarios)('should return status code 400 when required field %s is not send', async (scenario) => {

        delete input[scenario]

        const { status, body } = await request.post(`/receivers`).send(input);

        expect(status).toBe(400)
        expect(body.statusCode).toBeDefined()
        expect(body.message).toEqual('Bad Request')
        expect(body.details).toBeDefined()          
    })
})