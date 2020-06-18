import { Request, Response } from "express";
import knex from "../database/connection";

export default class AttachmentController {
  async index(request: Request, response: Response) {
    const { card_id } = request.params;

    const card = await knex
      .select("*")
      .from("card")
      .where("_id", card_id)
      .first();

    if (!card)
      return response.status(400).send({ error: "Card does not exists" });

    const attachments = await knex
      .select("*")
      .from("attachment")
      .where("card_id", card_id);

    return response.send(attachments);
  }

  async upload(request: Request, response: Response) {
    const { card_id } = request.params;

    const card = await knex
      .select("*")
      .from("card")
      .where("_id", card_id)
      .first();

    if (!card)
      return response.status(400).send({ error: "Card does not exists" });

    const { originalname: name, size, filename: key } = request.file;

    const url = `${process.env.APP_URL}/files/${key}`;
    const attachmentId = await knex('attachment').insert({ name, size, card_id, key, url }).returning('id');
    const attachment = await knex.select('*').from('attachment').where('id', attachmentId[0]).first();
    return response.send(attachment);
  }
}
