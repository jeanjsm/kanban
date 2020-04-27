const axios = require('axios');
const Card = require('../models/Card');
const List = require('../models/List');
const User = require('../models/User');

module.exports = {
  async index(request, response) {
    const { list_id } = request.query;

    const list = await List.findById(list_id);

    if (!list) {
      return response.status(400).json({ error: 'list does not exists' });
    }

    const cards = await Card.find({ list: list_id });

    return response.json(cards);
  },

  async store(request, response) {
    const { user_id } = request.headers;
    const { list_id, title } = request.body;

    const user = await User.findById(user_id);

    if (!user) {
      return response.status(400).json({ error: 'User does not exists' });
    }

    const list = await List.findById(list_id);

    if (!list) {
      return response.status(400).json({ error: 'List does not exists' });
    }

    const card = await Card.create({ title, list: list_id, owner: user_id });
    return response.json(card);
  },

  async update(request, response) {
    const newCard = request.body;
    await Card.findByIdAndUpdate(newCard._id, newCard, function(err, doc) {
      if (err) return response.status(500).json({ error: 'Error updating ' + newCard.title });
      return response.json({ message: 'Succesfully saved.' })
    });
  },

  async added(request, response) {
    const cardTemp = request.body;
    const card = await Card.create(cardTemp);
    return response.json(card);
  },

  async delete(request, response) {
    const { id } = request.query;
    await Card.findByIdAndDelete(id, function(err, doc) {
      if (err) return response.status(500).json({ error: 'Error removing ' + id });
      return response.json({ message: 'Succesfully saved.' })
    });
  }
}