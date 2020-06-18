import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('attachment', table => {
    table.increments('_id').primary();
    table.string('name');
    table.integer('size');
    table.string('key');
    table.string('url', 500);
    table.integer('card_id')
      .notNullable()
      .references('_id')
      .inTable('card');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('attachment');
}