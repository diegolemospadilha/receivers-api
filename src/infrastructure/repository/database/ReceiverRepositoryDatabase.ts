import { db } from "../../database/database";
import Receiver from "../../../domain/Receiver";
import ReceiverRepository from "../../../domain/repository/ReceiverRepository";
import { dbToDomain } from "../../../domain/mapper/ReceiverMapper";

export class ReceiverRepositoryDatabase implements ReceiverRepository {
    
    async getAll(): Promise<Receiver[]> {
        throw new Error("Method not implemented.");
    }

    async getById(id: number): Promise<Receiver> {
        try {
            const [ data ] =  await db('receivers')
                .select('*')
                .where({ 'receivers.id': id })

            return dbToDomain(data);
        } catch (error) {
            console.log('error', error);
            throw new Error('Internal Error');
        }
    }
    
    async create(receiver: Receiver): Promise<number> {
        const tx = await db.transaction();
        try {
            const { name, status, email, pixKeyType, pixKey } = receiver;
            const [ receiverId ]: any = await db('receivers')
                .transacting(tx)
                .returning('id')
                .insert({ name, status, email, pix_key_type: pixKeyType, pix_key: pixKey,})
            
            await tx.commit();
            return receiverId.id;

        } catch (error) {
            console.log('error', error);
            await tx.rollback(error);
            throw new Error('Internal Error');
        }
    } 
}