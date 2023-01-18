import { ReceiverInputDummy } from '../dummies/ReceiverInputDummy';
require('dotenv').config()
import { request } from './setup';
describe('Get receiver by its id integration tests', () => {

    let input: any;
    let receiverToBeSearched: any;

    beforeAll(async () => {
        input = ReceiverInputDummy.stub();
        const { body }  = await request.post(`/receivers`).send(input);
        receiverToBeSearched = body
    })
    
    it('should get receiver by its id', async () => {
        const { status, body } = await request.get(`/receivers/${receiverToBeSearched.id}`)

        expect(status).toBe(200)
        expect(body.id).toBeDefined()
        expect(body.name).toEqual(receiverToBeSearched.name)
        expect(body.status).toEqual(receiverToBeSearched.status)
        expect(body.pixKeyType).toEqual(receiverToBeSearched.pixKeyType)
        expect(body.pixKey).toEqual(receiverToBeSearched.pixKey)
    })

    it('should return 404 when receiver is not found', async () => {
        const nonExistentId = Math.floor(Math.random() * 1000000000 + 1)

        const { status, body } = await request.get(`/receivers/${nonExistentId}`)

        expect(status).toBe(404)
        expect(body.statusCode).toEqual(404)
        expect(body.message).toEqual('Not found')
        expect(body.details).toEqual(`Receiver not found with id: ${nonExistentId}`)
    })
})