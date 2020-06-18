import { Request, Response } from 'express';
import knex from '../database/connection';

export default class ListController {
  async index(request: Request, response: Response) {
    const { board_id } = request.query;

    const board = await knex('board').where('_id', Number(board_id)).first();

    if (!board)
      return response.status(400).send({ error: 'Board does not exists' });

    const lists = await knex('list').where('board_id', Number(board_id)).select('*');

    return response.send(lists);
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.headers;
    const { _id, board_id, title, order, locked } = request.body;

    const trx = await knex.transaction();

    const user = await knex('user').where('_id', Number(user_id));

    if (!user)
      return response.status(400).json({ error: 'User does not exists' });

    const board = await knex('board').where('_id', Number(board_id));

    if (!board)
      return response.status(400).json({ error: 'Board does not exists' });

    const insertedIds = await trx('list').insert({ user_id: user_id, board_id: board_id, title, order, locked }).returning('_id');

    const list = await trx('list').where('_id', insertedIds[0]).first();
    trx.commit();
    return response.send(list);

  }
}