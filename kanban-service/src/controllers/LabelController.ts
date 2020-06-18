import { Request, Response } from "express";
import knex from "../database/connection";

export default class LabelController {
  async index(request: Request, response: Response) {
    const labels = await knex.select("*").from("label");
    return response.send(labels);
  }

  async create(request: Request, response: Response) {
    const { name, color } = request.body;

    if (!color) {
      return response.status(400).send({ error: "No color selected" });
    }

    const labelId = await knex("label").insert({ name, color }).returning('_id');
    const label = await knex.select('*').from('label').where('_id', labelId[0]);

    return response.send(label);
  }
}
