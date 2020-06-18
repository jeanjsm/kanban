import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('board', table => {
    table.increments('_id').primary();
    table.string('title');
    table.boolean('private');
    table.boolean('favorite');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('board');
}