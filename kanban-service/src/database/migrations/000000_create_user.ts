import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('user', table => {
    table.increments('_id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('user');
}