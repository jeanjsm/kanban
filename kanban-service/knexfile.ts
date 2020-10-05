import "dotenv/config";
import path from "path";

const host = process.env.HOST;
const user = process.env.USER;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

module.exports = {
  client: "pg",
  version: "9.6",
  connection: {
    host,
    user,
    password,
    database,
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
};
