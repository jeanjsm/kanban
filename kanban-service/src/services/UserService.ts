import knex from "../database/connection";

export default {
  async update(id: Number, fields: Object) {
    return await knex("user").where("_id", id).update(fields);
  },
};
