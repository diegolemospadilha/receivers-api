"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiverRepositoryDatabase = void 0;
const database_1 = require("../../database/database");
const ReceiverMapper_1 = require("../../../domain/mapper/ReceiverMapper");
const ApplicationError_1 = require("../../../domain/errors/ApplicationError");
class ReceiverRepositoryDatabase {
    formatQuery(query, filters) {
        if (filters.name) {
            query.whereLike('receivers.name', `%${filters.name || ''}%`);
        }
        if (filters.status) {
            query.whereLike('status', `%${filters.status}%`);
        }
        if (filters.pixKeyType) {
            query.whereLike('pix_key_type', `%${filters.pixKeyType}%`);
        }
        if (filters.pixKey) {
            query.whereLike('pix_key', `%${filters.pixKey}%`);
        }
        return query;
    }
    getAll(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const LIMIT_PER_PAGE = 10;
            const currentPage = filters.page > 1 ? filters.page : 1;
            try {
                const countQuery = (0, database_1.db)('receivers').count('* as count');
                const selectQuery = (0, database_1.db)('receivers').select('*');
                this.formatQuery(countQuery, filters);
                this.formatQuery(selectQuery, filters);
                const offset = (filters.page - 1) * LIMIT_PER_PAGE;
                const [count, data] = yield Promise.all([
                    countQuery.first(),
                    selectQuery.offset(offset).limit(LIMIT_PER_PAGE)
                ]);
                const totalPages = Math.ceil(count.count / LIMIT_PER_PAGE);
                return (0, ReceiverMapper_1.dbToOutputWithPaginate)(data, currentPage, totalPages);
            }
            catch (error) {
                console.log('error', error);
                throw new ApplicationError_1.ApplicationError('Internal Error', 'Ínternal Server Error', 500);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [data] = yield (0, database_1.db)('receivers')
                    .select('*')
                    .where({ 'receivers.id': id });
                return (0, ReceiverMapper_1.dbToDomain)(data);
            }
            catch (error) {
                console.log('error', error);
                throw new Error('Internal Error');
            }
        });
    }
    create(receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield database_1.db.transaction();
            try {
                const { name, status, email, pixKeyType, pixKey } = receiver;
                const [receiverId] = yield (0, database_1.db)('receivers')
                    .transacting(tx)
                    .returning('id')
                    .insert({
                    name,
                    status,
                    email,
                    pix_key_type: pixKeyType,
                    pix_key: pixKey
                });
                yield tx.commit();
                return receiverId.id;
            }
            catch (error) {
                console.log('error', error);
                yield tx.rollback(error);
                throw new ApplicationError_1.ApplicationError('Internal Error', 'Ínternal Server Error', 500);
            }
        });
    }
    update(receiver) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield database_1.db.transaction();
            const { id, name, status, email, pixKeyType, pixKey } = receiver;
            try {
                const [receiverId] = yield (0, database_1.db)('receivers')
                    .transacting(tx)
                    .returning('id')
                    .update({
                    name,
                    status,
                    email,
                    pix_key_type: pixKeyType,
                    pix_key: pixKey
                }).where({ id });
                yield tx.commit();
                return receiverId.id;
            }
            catch (error) {
                console.log('error', error);
                yield tx.rollback(error);
                throw new ApplicationError_1.ApplicationError('Internal Error', 'Ínternal Server Error', 500);
            }
        });
    }
    delete(idsToBeDeleted) {
        return __awaiter(this, void 0, void 0, function* () {
            const tx = yield database_1.db.transaction();
            try {
                yield (0, database_1.db)('receivers')
                    .del().whereIn('id', idsToBeDeleted);
                yield tx.commit();
            }
            catch (error) {
                console.log('error', error);
                yield tx.rollback(error);
                throw new ApplicationError_1.ApplicationError('Internal Error', 'Ínternal Server Error', 500);
            }
        });
    }
}
exports.ReceiverRepositoryDatabase = ReceiverRepositoryDatabase;
