import { db } from "../../database/database";
import Receiver from "../../../domain/Receiver";
import ReceiverRepository from "../../../domain/repository/ReceiverRepository";
import { dbToDomain, dbToOutputWithPaginate } from "../../../domain/mapper/ReceiverMapper";
import { ApplicationError } from "../../../domain/errors/ApplicationError";
import { GetAllReceiverInput } from "../../../domain/dto/GetAllReceiverInput";
import { GetAllReceiverOutput } from "../../../domain/dto/GetAllReceiverOutput";

export class ReceiverRepositoryDatabase implements ReceiverRepository {
    
    private formatQuery(query, filters: GetAllReceiverInput){
        if(filters.name){
            query.whereLike('receivers.name', `%${filters.name || ''}%`)
        }
        if(filters.status){
            query.whereLike('status', `%${filters.status}%`)
        }
        if(filters.pixKeyType){
            query.whereLike('pix_key_type', `%${filters.pixKeyType}%`)
        }
        if(filters.pixKey){
            query.whereLike('pix_key', `%${filters.pixKey}%`)
        }
        return query;
    }
    async getAll(filters: GetAllReceiverInput): Promise<GetAllReceiverOutput> {

        const LIMIT_PER_PAGE = 10;
        const currentPage = filters.page > 1 ? filters.page : 1;
        try {
            const countQuery  =  db('receivers').count('* as count')
            const selectQuery  =  db('receivers').select('*')

            this.formatQuery(countQuery, filters);
            this.formatQuery(selectQuery, filters);
    
            const offset = (filters.page - 1) * LIMIT_PER_PAGE;

            const [count, data] =  await Promise.all([
                countQuery.first(),
                selectQuery.offset(offset).limit(LIMIT_PER_PAGE)
            ])

            const totalPages = Math.ceil(count.count as number / LIMIT_PER_PAGE)
            
            return dbToOutputWithPaginate(data, currentPage, totalPages)
        } catch (error) {
            console.log('error', error);
            throw new ApplicationError('Internal Error', 'Ínternal Server Error', 500);
        }
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
                .insert({ 
                    name, 
                    status, 
                    email, 
                    pix_key_type: pixKeyType, 
                    pix_key: pixKey
            })
            
            await tx.commit();
            return receiverId.id;

        } catch (error) {
            console.log('error', error);
            await tx.rollback(error);
            throw new ApplicationError('Internal Error', 'Ínternal Server Error', 500);
        }
    }

    async update(receiver: Receiver): Promise<number> {
        const tx = await db.transaction();
        const { id, name, status, email, pixKeyType, pixKey } = receiver;
        try {
            const [ receiverId ]: any = await db('receivers')
                .transacting(tx)
                .returning('id')
                .update({ 
                    name, 
                    status, 
                    email, 
                    pix_key_type: pixKeyType, 
                    pix_key: pixKey 
                }).where({ id })

                await tx.commit();
                return receiverId.id;

        } catch (error) {
            console.log('error', error);
            await tx.rollback(error);
            throw new ApplicationError('Internal Error', 'Ínternal Server Error', 500);
        }
    }
}