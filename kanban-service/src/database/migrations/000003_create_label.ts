import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('label', table => {
    table.increments('_id').primary();
    table.string('name').notNullable();
    table.string('color').notNullable();
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('label');
}