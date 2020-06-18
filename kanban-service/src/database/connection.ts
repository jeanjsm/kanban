import knex from 'knex';

const connection = knex({
  client: 'pg',
  version: '9.6',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'boards'
  },
})

export default connection;