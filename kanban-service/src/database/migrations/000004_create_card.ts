import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('card', table => {
    table.increments('_id').primary();
    table.string('title').notNullable();
    table.string('description', 5000);
    table.integer('order');
    table.integer('list_id')
      .notNullable()
      .references('_id')
      .inTable('list');
    table.integer('label_id')
      .references('_id')
      .inTable('label');
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updatedAt').notNullable().defaultTo(knex.fn.now());
  })
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('card');
}