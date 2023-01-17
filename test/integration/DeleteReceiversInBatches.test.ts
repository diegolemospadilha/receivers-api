require('dotenv').config()
import { ReceiverInputDummy } from '../dummies/ReceiverInputDummy';
import { request } from './setup';
describe('Delete receivers in batches integration tests', () => {

    const NUMBER_OF_RECEIVERS_TO_CREATED = 3

    let input: any;
    let idsToBeDeleted: number[] = [];
    

    beforeAll(async () => {
        for(let i=0; i < NUMBER_OF_RECEIVERS_TO_CREATED; i++){
            input = ReceiverInputDummy.stub();
            const { body } = await request.post(`/receivers`).send(input);
            idsToBeDeleted.push(body.id)   
        }
    })

    it('should delete a receivers in batches', async () => {
        const { status } = await request.post('/receivers/delete-records').send({
            ids: idsToBeDeleted
        })

        expect(status).toBe(204)
    })

    
    it('should return status code 400 when at least one id is not send', async () => {

        const { status, body } = await request.post('/receivers/delete-records').send({
            ids: []
        })
        
        expect(status).toBe(400)
        expect(body.statusCode).toBeDefined()
        expect(body.message).toEqual('Bad Request')
        expect(body.details).toBeDefined()      
    })
})