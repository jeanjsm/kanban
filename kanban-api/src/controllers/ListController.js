const axios = require('axios');
const List = require('../models/List');
const Board = require('../models/Board');
const User = require('../models/User');

module.exports = {
  async index(request, response) {
    const { board_id } = request.query;

    const board = await Board.findById(board_id);

    if (!board) {
      return response.status(400).json({ error: 'Board does not exists' });
    }

    const lists = await List.find({ board: board_id });

    return response.json(lists);
  },

  async store(request, response) {
    const { user_id } = request.headers;
    const { _id, board_id, title, order, locked } = request.body;

    const user = await User.findById(user_id);

    if (!user) {
      return response.status(400).json({ error: 'User does not exists' });
    }

    const board = await Board.findById(board_id);

    if (!board) {
      return response.status(400).json({ error: 'Board does not exists' });
    }

    // if (_id) {
    //   const list = await List.findById(_id);
    //   if (!list) {
    //     return response.status(400).json({ error: 'List does not exists' });
    //   }
    // } else {
    const list = await List.create({ user: user_id, board: board_id, title, order, locked });
    return response.json(list);
    // }
  }
}