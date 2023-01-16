require('dotenv').config()
import { request } from './setup';
describe('Update receiver integration tests', () => {

    let input: any;
    let inputToUpdated: any;
    let idToUpdated;

    beforeAll(async () => {
        input = {
            name: 'Johnn Deer',
            status: 'DRAFT',
            email: "email@email.com",
            pixKeyType: 'EMAIL',
            pixKey: "email@email.com"
        }
        const { body } = await request.post(`/receivers`).send(input);
        idToUpdated = body.id   
    })

    beforeEach(() => {
        inputToUpdated = {
            name: 'New name',
            status: 'VALID',
            email: "newemail@email.com",
            pixKeyType: 'EMAIL',
            pixKey: "email@email.com"
        }
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