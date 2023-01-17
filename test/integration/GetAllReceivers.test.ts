import { ReceiverInputDummy } from '../dummies/ReceiverInputDummy';
require('dotenv').config()
import { request } from './setup';
describe('Get all receivers by filters integration tests', () => {

    let input: any;

    beforeAll(async () => {
        input = ReceiverInputDummy.stub();
        await request.post(`/receivers`).send(input);
    })
    
    it('should get all receivers by filters', async () => {
        const { status, body } = await request.get(`/receivers`)

        expect(status).toBe(200)
        expect(body.totalPages).toBeDefined()
        expect(body.currentPage).toEqual(1)
        expect(body.data).toBeDefined()
    })
})