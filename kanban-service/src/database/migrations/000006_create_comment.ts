import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('comment', table => {
    table.increments('_id').primary();
    table.string('text', 2000);
    table.integer('user_id')
      .notNullable()
      .references('_id')
      .inTable('user');
    table.integer('card_id')
      .notNullable()
      .references('_id')
      .inTable('card');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('comment');
}