import { Request, Response } from "express";
import knex from "../database/connection";
import Card from "../models/Card";
import Label from "../models/Label";

export default class CardController {
  async index(request: Request, response: Response) {
    const { list_id } = request.query;
    const list = await knex.select('*').from('list').where('_id', Number(list_id)).first();

    if (!list)
      return response.status(400).send({ error: 'List does not exists' });

    let cards = await knex.select('*').from('card').where('list_id', Number(list_id));

    for (let index in cards) {
      let card = cards[index];
      if (card.label_id) {
        const label = await knex.select('*').from('label').where('_id', card.label_id).first();
        card.label = label;
      }
      const owner = await knex.select('name').from('user').join('user_card', 'user._id', '=', 'user_card.user_id').where('user_card.card_id', card._id).andWhere('user_card.owner', true).first();
      card.owner = owner;
    }
    return response.send(cards);
  }

  async findCard(request: Request, response: Response) {
    const { card_id } = request.params;

    let card: Card = await knex.select('*').from('card').where('_id', card_id).first();

    const label: Label = await knex.select('*').from('label').where('_id', Number(card.label_id)).first();

    const owner = await knex.select('name').from('user').join('user_card', 'user._id', '=', 'user_card.user_id').where('user_card.card_id', card._id).andWhere('user_card.owner', true).first();

    if (label)
      card.label = label;
    if (owner)
      card.owner = owner;
    return response.send(card);
  }

  async loadDescription(request: Request, response: Response) {
    const { card_id } = request.params;

    if (!card_id)
      return response.status(400).send({ error: 'No parameters informed' });

    let description = await knex.select('description').from('card').where('_id', Number(card_id)).first();
    return response.send(description);
  }

  async create(request: Request, response: Response) {
    const { user_id } = request.headers;
    const { list_id, title } = request.body;

    const user = knex.select('*').from('user').where('_id', Number(user_id)).first();

    if (!user)
      return response.status(400).send({ error: 'User does not exists' });

    const list = knex.select('*').from('list').where('_id', Number(list_id)).first();
    if (!list)
      return response.status(400).send({ error: 'List does not exists' });

    const trx = await knex.transaction();

    const insertedIds = await trx('card').insert({ title, list_id }).returning('_id');
    const card_id = insertedIds[0];

    await trx('user_card').insert({ user_id, card_id, owner: true });
    trx.commit();

    let card = await knex.select('*').from('card').where('_id', card_id).first();

    return response.send(card);
  }

  async update(request: Request, response: Response) {
    const newCard = request.body;
    if (newCard.label) {
      newCard.label_id = newCard.label._id;
      delete newCard.label;
      await knex('card').update('label_id', newCard.label_id).where('_id', Number(newCard._id));
    }
    await knex('card').update('list_id', newCard.list).where('_id', Number(newCard._id));
    return response.send(newCard);
  }

  async updateLabel(request: Request, response: Response) {
    const { card_id, label_id } = request.body;

    await knex('card').update('label_id', label_id).where('_id', Number(card_id));
    const card = await knex.select('*').from('card').where('_id', card_id).first();
    return response.send(card);
  }

  async updateDescription(request: Request, response: Response) {
    const { card_id, description } = request.body;
    await knex('card').update('description', description).where('_id', Number(card_id));
    const card = await knex.select('*').from('card').where('_id', card_id).first();
    return response.send(card);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.query;
    knex.transaction(async function(trx) {
      await trx('user_card').where('card_id', Number(id)).del();
      await trx('card').where('_id', Number(id)).del();
    }).then(res => {
      return response.status(200).send();
    }).catch(error => {
      return  response.status(400).json({ message: error })
    });
  }
}
