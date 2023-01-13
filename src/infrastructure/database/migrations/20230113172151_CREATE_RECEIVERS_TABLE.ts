import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('receivers', (t) => {
        t.increments('id')
        t.timestamp('created_at').defaultTo(knex.fn.now());

        t.string('name').notNullable();
        t.string('email').nullable();
        t.string('status').notNullable();
        t.string('pix_key_type').notNullable();
        t.string('pix_key').notNullable();
        t.index('id', 'idx_receivers_id');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('receivers');
}

