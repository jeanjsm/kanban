const axios = require('axios');
const Card = require('../models/Card');

module.exports = {
  async index(request, response) {
    const cards = await Card.find();

    return response.json(cards);
  },

  async store(request, response) {
    const { title } = request.body;
    let card = await Card.create({ title });
    return response.json(card);
  }
}