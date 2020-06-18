import { Request, Response } from "express";
import knex from "../database/connection";

export default class CommentController {
  async index(request: Request, response: Response) {
    const { card_id } = request.params;

    const card = await knex.select('*').from('card').where('_id', card_id).first();

    if (!card)
      return response.status(400).send({ error: 'Card does not exists' });

    const comments = await knex.select('*').from('comment').where('card_id', card_id);

    for (let index in comments) {
      let comment = comments[index];
      const user = await knex.select('*').from('user').where('_id', comment.user_id).first();
      delete(user.password);
      comment.user = user;
    }

    return response.send(comments);
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.headers;
    const { text } = request.body;
    const { card_id } = request.params;

    const user = await knex.select('*').from('user').where('_id', Number(user_id));

    if (!user)
      return response.status(400).send({ error: 'User does not exists' });

    const card = await knex.select('*').from('card').where('_id', card_id);

    if (!card)
      return response.status(400).send({ error: 'Card does not exists' });

    const commentId = await knex('comment').insert({ text, card_id, user_id }).returning('_id');

    const comment = await knex.select('*').from('comment').where('_id', commentId[0]);
    return response.send(comment);
  }
}