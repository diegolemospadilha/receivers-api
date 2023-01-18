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
exports.down = exports.up = void 0;
const js_brasil_1 = require("js-brasil");
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let index = 0; index < 30; index++) {
            const randomPixKey = getRandomPixKey();
            const ramdomStatus = getRandomStatus(index);
            yield knex('receivers').insert({
                name: js_brasil_1.fakerBr.pessoa().nome,
                email: js_brasil_1.fakerBr.email(),
                status: ramdomStatus,
                pix_key_type: randomPixKey.type,
                pix_key: randomPixKey.value
            });
        }
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex('receivers').del();
    });
}
exports.down = down;
function getRandomStatus(index) {
    return index % 2 === 0 ? 'DRAFT' : 'VALID';
}
function getRandomPixKey() {
    const randomKey = Math.floor(Math.random() * 4 + 1);
    return combinationsToPixKeyType[randomKey];
}
const combinationsToPixKeyType = [
    { type: 'CPF', value: js_brasil_1.fakerBr.cpf() },
    { type: 'CNPJ', value: js_brasil_1.fakerBr.cnpj() },
    { type: 'EMAIL', value: js_brasil_1.fakerBr.email() },
    { type: 'PHONE', value: js_brasil_1.fakerBr.celular() },
    { type: 'RANDOM_KEY', value: `dcta478j-196l-03fm-t6gh-4298er7845m2` },
];
