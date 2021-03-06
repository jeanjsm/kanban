import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('user_board', table => {
    table.increments('_id').primary();
    table.boolean('owner');
    table.integer('user_id')
      .notNullable()
      .references('_id')
      .inTable('user');
    table.integer('board_id')
      .notNullable()
      .references('_id')
      .inTable('board');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('user_board');
}