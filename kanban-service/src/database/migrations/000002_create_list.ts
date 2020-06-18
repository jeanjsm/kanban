import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('list', table => {
    table.increments('_id').primary();
    table.string('title').notNullable();
    table.integer('order');
    table.boolean('locked');
    table.integer('board_id')
      .notNullable()
      .references('_id')
      .inTable('board');
    table.integer('user_id')
      .notNullable()
      .references('_id')
      .inTable('user');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('list');
}