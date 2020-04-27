const axios = require('axios');
const Board = require('../models/Board');
const User = require('../models/User');

module.exports = {
  async index(request, response) {
    const boards = await Board.find();

    return response.json(boards);
  },

  async store(request, response) {
    const { user_id } = request.headers;
    const { title, private } = request.body;

    const user = await User.findById(user_id);

    if (!user) {
      return response.status(400).json({ error: 'User does not exists' });
    }

    let board = await Board.create({ owner: user_id, title, private });
    return response.json(board);
  }
}