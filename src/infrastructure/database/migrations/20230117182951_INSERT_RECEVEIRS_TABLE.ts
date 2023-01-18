import { fakerBr } from "js-brasil";
import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    for(let index=0; index < 30; index++){
        const randomPixKey = getRandomPixKey();
        const ramdomStatus = getRandomStatus(index)
        await knex('receivers').insert({
            name: fakerBr.pessoa().nome,
            email: fakerBr.email(),
            status: ramdomStatus,
            pix_key_type: randomPixKey.type,
            pix_key: randomPixKey.value
        })
    }
}


export async function down(knex: Knex): Promise<void> {
    await knex('receivers').del()
}

function getRandomStatus(index: number){
    return index % 2 === 0 ? 'DRAFT' : 'VALID'
}

function getRandomPixKey(){
    const randomKey = Math.floor(Math.random() * 4 + 1)
    return combinationsToPixKeyType[randomKey]
}

const combinationsToPixKeyType = [
    { type: 'CPF', value: fakerBr.cpf()},
    { type: 'CNPJ', value: fakerBr.cnpj()},
    { type: 'EMAIL', value: fakerBr.email()},
    { type: 'PHONE', value: `+55${fakerBr.celular().replace(/\D/g,'')}`},
    { type: 'RANDOM_KEY', value: `42a57095-84f3-4a42-b9fb-d08935c86f47`},
]

