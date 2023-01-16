require('dotenv').config()
import { ReceiverDummy } from './ReceiverDummy';
import { request } from './setup';
describe('Update receiver integration tests', () => {

    let input: any;
    let inputToUpdated: any;
    let idToUpdated;

    beforeAll(async () => {
        input = ReceiverDummy.stub();
        const { body } = await request.post(`/receivers`).send(input);
        idToUpdated = body.id   
    })

    beforeEach(() => {
        inputToUpdated = ReceiverDummy.stub();
    })
    it('should update a receiver', async () => {
        const { status, body } = await request.put(`/receivers/${idToUpdated}`).send(
            inputToUpdated
        )

        expect(status).toBe(200)
        expect(body.id).toBeDefined()
        expect(body.name).toEqual(inputToUpdated.name)
        expect(body.status).toEqual(inputToUpdated.status)
        expect(body.pixKeyType).toEqual(inputToUpdated.pixKeyType)
        expect(body.pixKey).toEqual(inputToUpdated.pixKey)
    })

    const scenarios = [
       'name',
       'status',
       'pixKeyType',
       'pixKey',
    ]
    it.each(scenarios)('should return status code 400 when required field %s is not send', async (scenario) => {

        delete inputToUpdated[scenario]

        const { status, body } = await request.put(`/receivers/${idToUpdated}`).send(inputToUpdated);

        expect(status).toBe(400)
        expect(body.statusCode).toBeDefined()
        expect(body.message).toEqual('Bad Request')
        expect(body.details).toBeDefined()
                   
    })
})