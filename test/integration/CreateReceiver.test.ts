require('dotenv').config()
import { request } from './setup';
describe('Create receiver integration tests', () => {

    let input: any;

    beforeEach(() => {
        input = {
            name: 'Johnn Deer',
            status: 'DRAFT',
            email: "email@email.com",
            pixKeyType: 'EMAIL',
            pixKey: "email@email.com"
        }
    })
    it('should create a new receiver', async () => {

        const { status, body } = await request.post(`/receivers`).send({
            name: 'Johnn Deer',
            status: 'DRAFT',
            email: "email@email.com",
            pixKeyType: 'EMAIL',
            pixKey: "email@email.com"
        })

        expect(status).toBe(201)
        expect(body.id).toBeDefined()
        expect(body.name).toEqual(input.name)
        expect(body.status).toEqual(input.status)
        expect(body.pixKeyType).toEqual(input.pixKeyType)
        expect(body.pixKey).toEqual(input.pixKey)
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
})