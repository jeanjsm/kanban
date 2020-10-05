import "dotenv/config";
import knex from "knex";

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const connection = knex({
  client: "pg",
  version: "9.6",
  connection: {
    host,
    user,
    password,
    database,
  },
});

export default connection;
